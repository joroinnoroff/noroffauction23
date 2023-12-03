import { useEffect, useState } from 'react';
import { API_SOCIAL_URL } from '../app/api/constants';

const StickySections = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async (limit) => {
      try {
        const response = await fetch(`${API_SOCIAL_URL}/listings?_bids=true&_active=true&_limit=${limit}`);
        if (!response.ok) {
          throw new Error(`Error fetching listings: ${response.statusText}`);
        }

        const data = await response.json();
        // Sort the listings by the number of bids in descending order
        const sortedListings = data.sort((a, b) => b._count.bids - a._count.bids);
        // Get the first `limit` listings
        const topListings = sortedListings.slice(0, limit);
        setListings(topListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    // Fetch only 5 listings (you can adjust the number as needed)
    fetchListings(5);
  }, []);

  useEffect(() => {
    const scrollSection = document.querySelector('.scroll_section');

    if (!scrollSection) {
      console.error('Scroll section not found');
      return;
    }

    // Clear existing content in the scroll section
    scrollSection.innerHTML = '';

    // Append each listing to the scroll section
    listings.forEach((listing, index) => {
      const listingContainer = document.createElement('div');
      listingContainer.className = 'listing-item w-[800px] h-[80%]';

      const img = document.createElement('img');
      img.src = listing.media[0];
      img.alt = listing.title;

      const bidAmount = document.createElement('h6');
      bidAmount.className = 'bid-amount';
      bidAmount.textContent = `Highest Bid:$ ${listing._count.bids > 0 ? listing.bids[0].amount : 'No bids yet'}`;

      listingContainer.appendChild(img);
      listingContainer.appendChild(bidAmount);

      scrollSection.appendChild(listingContainer);
    });

    const transform = () => {
      const offsetTop = scrollSection.offsetTop;
      const startTransformOffset = window.innerHeight * 2; // Adjust the value to your preference
    
      // Calculate the scroll position with the offset
      let scrollPosition = window.scrollY - offsetTop;
    
      // Apply the startTransformOffset to delay the start of the transformation
      scrollPosition = Math.max(0, scrollPosition - startTransformOffset);
    
      // Calculate the percentage
      let percentage = (scrollPosition / window.innerHeight) * 100;
      percentage = percentage < 0 ? 0 : percentage > 800 ? 800 : percentage;
    
      // Apply the transformation
      scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;
    };
    

    // Call transform once to set initial state
    transform();

    window.addEventListener('scroll', transform);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', transform);
    };
  }, [listings]);

  return (
    <div className="sticky_parent bg-green-300">
      <h6 className='p-20'>Our most popular items:</h6>
      <div className="sticky">
        <div className="scroll_section"></div>
      </div>
    </div>
  );
};

export default StickySections;
