interface Seller {
  name: string;
  email: string;
  avatar: string;
}

interface Bid {
  id: string;
  amount: number;
  bidderName: string;
  created: string;
}

interface ListingCount {
  bids: number;
}

interface Listing {
  highestBid: number;
  id: string;
  title: string;
  description: string;
  tags?: string[];
  media?: string[];
  created: string;
  updated: string;
  endsAt: string;
  seller?: Seller;
  bids?: Bid[];
  _count: ListingCount;
}

// For filtering parameters
interface ListingFilter {
  _tag?: string;
  _active?: boolean;
}

// For creating a new listing
interface NewListing {
  title: string;
  description?: string;
  tags?: string[];
  media?: string[];
  endsAt: Date;
}

// For updating an existing listing
interface ListingUpdate {
  title?: string;
  description?: string;
  tags?: string[];
  media?: string[];
}

// For creating a new bid
interface BidRequest {
  amount: number;
}

export type { Seller, Bid, ListingCount, Listing, ListingFilter, NewListing, ListingUpdate, BidRequest };
