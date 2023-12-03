"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { createPost } from '../api/auctionItems/create'
import Image from 'next/image'
interface Props { }

const CreatePage = () => {
  const router = useRouter();

  const [postData, setPostData] = useState({
    title: '',
    body: '',
    media: '',
    tags: [],
    endsAt: '', // Add endsAt to the state
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: name === 'tags' ? value.split(',') : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Post data:", postData); // Log the postData before sending the request
      const response = await createPost(postData);
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return <div>



    <div>

      <section className='p-20'>
        <h6>Create an Auction Item</h6>

        <div>
          <form onSubmit={handleSubmit} className="py-10">
            <div className='container border w-full h-full py-10 rounded-md flex flex-col items-center justify-center gap-5'>
              <div className="mb-4 p-2 flex items-center justify-center flex-col">


                <input
                  type="url"
                  name="media"
                  id="media"
                  className="text-center text-md md:text-xl p-2 rounded-sm border "
                  value={postData.media}
                  onChange={handleInputChange}
                />

                <div className='mt-3 w-full lg:w-[800px] flex items-center justify-center'>
                  {postData.media && <img src={postData.media} alt="" />}
                </div>
              </div>
              <div className='dark:invert text-center p-2'>
                <label>
                  <h2 className="text-foreground-muted dark:invert font-semibold text-xl md:text-2xl">Auction End Date</h2>
                  <input
                    type="datetime-local" // Use datetime-local for date and time input
                    required
                    name="endsAt"
                    className='border dark:invert p-2 rounded-sm text-center'
                    value={postData.endsAt}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className='dark:invert text-center p-2'>

                <label>
                  <h2 className="text-foreground-muted dark:invert font-semibold text-xl md:text-2xl">Title of Post</h2>
                  <input
                    type="text"
                    required
                    name="title"
                    className='border dark:invert p-2 rounded-sm text-center'
                    value={postData.title}
                    onChange={handleInputChange}
                    placeholder="Title of Post"
                  />
                </label>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <label className='text-muted-foreground dark:invert font-semibold text-md'>
                  Share Your Thoughts
                </label>
                <textarea
                  name="body"
                  required
                  value={postData.body}
                  className="rounded-sm resize-none p-10 md:p-20 text-center mt-1 border"
                  onChange={handleInputChange}
                  placeholder="Start Typing..."
                />
              </div>

              <div className='text-center mt-4 flex flex-col'>
                <div className='flex flex-col gap-2 dark:invert '>
                  <label className='dark:invert'>Tags</label>
                  <input
                    type="text"
                    name="tags"
                    className='border dark:invert'
                    value={postData.tags.join(',')}
                    onChange={handleInputChange}
                  />


                  <div>

                  </div>

                </div>
                <div className="flex-row gap-3 items-end justify-center mt-10 dark:invert">
                  <div className='flex flex-row items-center justify-center gap-3 '>
                    <button id='submit' className='transition-all' >Create Post +</button>
                    <button className='dark:invert'>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
}

export default CreatePage