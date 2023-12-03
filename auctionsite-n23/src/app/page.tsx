"use client"
import Image from 'next/image'
import StickySections from '../app/stickySection';
import Lottie from "lottie-react";
import auctionAni from "../assets/animations/auctionanimation.json";
import { useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from 'react';
import Link from 'next/link';
import { ArrowDown, Plus } from 'lucide-react';
import { Seller, Bid, ListingCount, Listing, ListingFilter, NewListing, ListingUpdate, BidRequest } from '../app/api/interfaces/interface';
import { API_SOCIAL_URL } from './api/constants';
import nLogo from '../assets/images/norofflogo.png'

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const hasListings = user?.listings?.length > 0;
  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      window
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${API_SOCIAL_URL}/listings?_bids=true&_active=true&_limit=5`);

        if (!response.ok) {
          throw new Error(`Error fetching listings: ${response.statusText}`);
        }

        const data: Listing[] = await response.json(); // Ensure data conforms to Listing[] type

        // Fetch bids and seller info for each listing
        const listingsWithDetails = await Promise.all(
          data.map(async (listing) => {
            try {
              // Fetch bids
              const bidResponse = await fetch(`${API_SOCIAL_URL}/listings/${listing.id}?_seller=true?_bids=true`);
              if (!bidResponse.ok) {
                if (bidResponse.status === 404) {
                  console.log(`No bids found for listing ${listing.id}`);
                  return {
                    ...listing,
                    highestBid: 0,
                    sellerName: listing.seller?.name || "Unknown Seller",
                  };
                }

                console.error(`Error fetching bids for listing ${listing.id}: ${bidResponse.statusText}`);
                console.log(`Bid response for listing ${listing.id}:`, bidResponse);
                throw new Error(`Error fetching bids for listing ${listing.id}: ${bidResponse.statusText}`);
              }

              const bidData = await bidResponse.json();
              const highestBid = Array.isArray(bidData) && bidData.length > 0 ? Math.max(...bidData.map((bid: Bid) => bid.amount), 0) : 0;

              // Fetch seller info
              const sellerResponse = await fetch(`${API_SOCIAL_URL}/listings/${listing.id}?_seller=true&_bids=true`);

              if (!sellerResponse.ok) {
                console.error(`Error fetching seller info for listing ${listing.id}: ${sellerResponse.statusText}`);
                throw new Error(`Error fetching seller info for listing ${listing.id}: ${sellerResponse.statusText}`);
              }
              const sellerData = await sellerResponse.json();
              const sellerName = sellerData.name;

              return {
                ...listing,
                highestBid,
                sellerName,
              };
            } catch (error) {
              console.error(`Error fetching details for listing ${listing.id}:`, error);
              return listing;
            }
          })
        );

        // Sort by creation date and get the first 5
        const newestListings = listingsWithDetails.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()).slice(0, 5);

        setListings(newestListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);


  const handleBid = (listingId: string) => {
    // Implement the logic for placing a bid on the listing with the given ID
    console.log(`Placing bid on listing ${listingId}`);
  };



  return (

    <main>

      {isLoggedIn ? (

        <section>
          <div className='mt-20 p-20'>
            <div className=''>
              <Image src={nLogo} height={200} width={100} className="bg-black p-3 rounded-2xl" alt='Noroff-logo' />
            </div>
            <h6 className='text-4xl'>
              Welcome {user.name}
            </h6>
            <h1>Create Listing</h1>
            <Link href={"/create"}>
              <button className='login-btn shadow-2xl flex  p-2 px-3 md:p-2 md:py-8 md:px-20 md:text-3xl text-center rounded-3xl hover:bg-[#117665] bg-[#0ec8a9]  hover:text-white uppercase transition-all mt-3 mb-3 text-xl z-40 hover:scale-110 items-center'>
                Here
                <div className="door-icon">
                  <Plus />
                </div>
              </button>
            </Link>

            <div className='mt-10 h-screen p-2'>
              <Link href={""} className='hover:underline transition-all hover:scale-110 '>View all </Link>

              <h6>Newest Items</h6>
              <div className='flex gap-2 flex-wrap lg:flex-nowrap lg:flex-row'>
                {listings.map((listing) => (
                  <div key={listing.id} className="flex flex-col justify-between">
                    <img src={listing.media[0]} />
                    <h3>{listing.title}</h3>
                    <p>{listing.description}</p>
                    <small>
                      {listing.highestBid > 0
                        ? `Highest Bid: ${listing.highestBid}`
                        : 'No Bids Yet - Starting Bid: 0'
                      }
                    </small>
                    <p>Seller: {listing.seller?.name}</p>
                    <div>
                      <input type="text" placeholder="Place your bid" />
                      <button onClick={() => handleBid(listing.id)}>Place Bid</button>
                    </div>
                  </div>
                ))}
              </div>




            </div>





          </div>
        </section>
      ) : (

        <section>
          <div className="container mt-20 h-[60vh]">
            <h6 className='text-6xl'>
              Welcome to Noroff Auction
            </h6>
            <p className='md:text-lg'>where the thrill of online bidding meets the joy of listing your treasures! Sign up today to unlock a world of possibilities with a generous <span className='font-bold'>1000 credits</span> waiting for you. Dive into our dynamic marketplace where you can bid on a variety of exciting items or showcase your own by creating personalized listings. Whether you're a seasoned bidder or a first-time seller, Noroff Auction is your go-to destination for an interactive and rewarding online experience. Join us now to start exploring, bidding, and listing – the next adventure is just a click away!</p>
            <p>When a listing ends, the winning bid amount will be transferred to the seller's credits. All losing bids will be refunded to its original bidder's credits.</p>
            <div className="text-md flex gap-10 items-center ">
              <Link href={"/profile/login"} className="border p-4 md:p-6 md:text-2xl rounded-2xl  text-green-700 hover:text-green-900 hover:scale-105 transition-all">
                <h2>Login</h2>
              </Link>
              <span className="text-xs">Or</span>
              <Link href={"/profile/register"} className="border  p-4 md:p-6 md:text-2xl rounded-2xl text-green-700 hover:text-green-900 hover:scale-105 transition-all ">
                <h2>Register</h2>
              </Link>
            </div>
            <h6 className='mt-5 animate-'>Browse items below <ArrowDown color='green' className='animate-bounce' /></h6>

            <div className='flex items-center justify-center'>
              <Lottie animationData={auctionAni} className="flex items-center justify-center  md:w-5/12 m-auto" />
            </div>
          </div>
        </section>
      )}





      <div className='h-full'>

      </div>
      <StickySections />


      <div className="container">
        <h6 className='text-4xl'>
          About Us
        </h6>
        <p>we believe in creating a sustainable future through innovative, green software engineering. As a free-to-use platform, we prioritize accessibility for all users while also championing environmental responsibility. At Noroff Auction, we are committed to minimizing our ecological footprint by adopting energy-efficient practices in our server management. Our dedication to green software engineering ensures that you can enjoy our services guilt-free, knowing that your online activities contribute to a more sustainable and eco-friendly digital landscape. Join us in building a greener tomorrow while enjoying the convenience of a free and user-friendly platform. Together, we can make a positive impact on the world.</p>

      </div>

      <section>
        <div className="container">
          <h6>
            Do you have a question ?
          </h6>
          <h1>Contact us here</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quis, doloremque neque temporibus reprehenderit aliquam sed delectus aspernatur consectetur perspiciatis. Impedit iste necessitatibus hic fugiat doloribus dicta quia vitae perferendis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quis, doloremque neque temporibus reprehenderit aliquam sed delectus aspernatur consectetur perspiciatis. Impedit iste necessitatibus hic fugiat doloribus dicta quia vitae perferendis.</p>
        </div>
      </section>


    </main>
  )
}