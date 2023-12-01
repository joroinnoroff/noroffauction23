"use client"
import Image from 'next/image'
import StickySections from '../app/stickySection';
import Lottie from "lottie-react";
import auctionAni from "../assets/animations/auctionanimation.json";

export default function Home() {




  return (

    <main>
      <section>
        <div className="container">
          <h1>
            NorOff Auction
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quis, doloremque neque temporibus reprehenderit aliquam sed delectus aspernatur consectetur perspiciatis. Impedit iste necessitatibus hic fugiat doloribus dicta quia vitae perferendis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quis, doloremque neque temporibus reprehenderit aliquam sed delectus aspernatur consectetur perspiciatis. Impedit iste necessitatibus hic fugiat doloribus dicta quia vitae perferendis.</p>



          <div className='w-3/4 md:w-4/12 m-auto'>
            <Lottie animationData={auctionAni} />
          </div>

        </div>
      </section>

      <StickySections />


      <div className="container">
        <h1>
          About section
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quis, doloremque neque temporibus reprehenderit aliquam sed delectus aspernatur consectetur perspiciatis. Impedit iste necessitatibus hic fugiat doloribus dicta quia vitae perferendis.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quis, doloremque neque temporibus reprehenderit aliquam sed delectus aspernatur consectetur perspiciatis. Impedit iste necessitatibus hic fugiat doloribus dicta quia vitae perferendis.</p>
      </div>



      <div className="sticky_parent">
        <div className="sticky">
          <div className="scroll_section"></div>
        </div>
      </div>


      <section>
        <div className="container">
          <h1>
            end section
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quis, doloremque neque temporibus reprehenderit aliquam sed delectus aspernatur consectetur perspiciatis. Impedit iste necessitatibus hic fugiat doloribus dicta quia vitae perferendis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quis, doloremque neque temporibus reprehenderit aliquam sed delectus aspernatur consectetur perspiciatis. Impedit iste necessitatibus hic fugiat doloribus dicta quia vitae perferendis.</p>
        </div>
      </section>


    </main>
  )
}
