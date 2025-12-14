




export const dynamic = "force-dynamic"; // add this at the top of your file

import ListingCard from "../components/ListingCard";

type Listing = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  image: {
    filename: string;
    url: string;
    _id: string;
  };
  location: string;
  country: string;
};

async function getListings(): Promise<Listing[]> {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`, {
      cache: "no-store", // ensures fresh fetch at runtime
    });
  const data = await res.json();
  return Array.isArray(data) ? data : data.listings || [];
}

export default async function ListingsPage() {
  const listings = await getListings();

  return (
    <div className="p-4">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 m-auto"
        style={{ maxWidth: 1320 }}
      >
        {listings.map((listing: Listing) => (
          <ListingCard key={listing._id} {...listing} />
        ))}
      </div>
    </div>
  );
}
