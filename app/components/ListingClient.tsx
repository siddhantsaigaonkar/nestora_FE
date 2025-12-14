

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import ShowReviews from "./ShowReviews";
// import OwnerButtons from "./OwnerButtons";
// import ReviewFormWrapper from "./ReviewFormWrapper";

// type Review = {
//   _id: string;
//   comment: string;
//   rating: number;
//   createdAt?: string;
//   author: { _id: string; username: string; email: string } | null;
// };

// type Owner = { _id: string; email: string; username: string };

// type Listing = {
//   _id: string;
//   slug: string;
//   title: string;
//   description: string;
//   price: number;
//   location: string;
//   country: string;
//   image?: { filename: string; url: string; _id: string }; // ⚠ image may be optional
//   reviews: Review[];
//   owner: Owner;
// };

// export default function ListingClient({ slug }: { slug: string }) {
//   const [data, setData] = useState<{
//     listing: Listing;
//     currentUserId: string | null;
//   } | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchListing() {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${slug}`,
//           {
//             credentials: "include",
//           }
//         );

//         if (!res.ok) throw new Error("Failed to fetch listing");

//         const json = await res.json();
//         setData(json);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchListing();
//   }, [slug]);

//   if (loading) return <p className="p-4">Loading listing...</p>;
//   if (!data || !data.listing) return <p className="p-4">Listing not found</p>;

//   const { listing, currentUserId } = data;

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       {listing.image?.url ? (
//         <Image
//           src={listing.image.url}
//           width={900}
//           height={400}
//           alt={listing.title}
//           className="rounded-xl mb-4 object-cover"
//         />
//       ) : (
//         <div className="w-full h-64 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
//           No image available
//         </div>
//       )}

//       <p>{listing?.owner?.username || "Unknown Owner"}</p>

//       <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
//       <p className="text-gray-700 mb-4">{listing.description}</p>

//       <p className="text-lg font-semibold mb-1">
//         Price: {listing.price} / Night
//       </p>
//       <p className="text-gray-600">
//         Location: {listing.location}, {listing.country}
//       </p>

//       <OwnerButtons ownerId={listing.owner._id} slug={listing.slug} />

//       <div className="mt-10">
//         <ReviewFormWrapper listingSlug={listing.slug} />
//         <ShowReviews reviews={listing.reviews} currentUserId={currentUserId} />
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ShowReviews from "./ShowReviews";
import OwnerButtons from "./OwnerButtons";
import ReviewFormWrapper from "./ReviewFormWrapper";

type Review = {
  _id: string;
  comment: string;
  rating: number;
  createdAt?: string;
  author: { _id: string; username: string; email: string } | null;
};

type Owner = { _id: string; email: string; username: string } | null;

type Listing = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  location: string;
  country: string;
  image?: { filename: string; url: string; _id: string };
  reviews: Review[];
  owner: Owner;
};

export default function ListingClient({ slug }: { slug: string }) {
  const [data, setData] = useState<{
    listing: Listing;
    currentUserId: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${slug}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch listing");

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [slug]);

  if (loading) return <p className="p-4">Loading listing...</p>;
  if (!data || !data.listing) return <p className="p-4">Listing not found</p>;

  const { listing, currentUserId } = data;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {listing.image?.url ? (
        <Image
          src={listing.image.url}
          width={900}
          height={400}
          alt={listing.title}
          className="rounded-xl mb-4 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
          No image available
        </div>
      )}

      {/* Safely show owner info */}
      <p>{listing.owner?.username || "Unknown Owner"}</p>

      <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
      <p className="text-gray-700 mb-4">{listing.description}</p>

      <p className="text-lg font-semibold mb-1">
        Price: {listing.price} / Night
      </p>
      <p className="text-gray-600">
        Location: {listing.location}, {listing.country}
      </p>

      {/* Render OwnerButtons only if owner exists */}
      {listing.owner?._id && (
        <OwnerButtons ownerId={listing.owner._id} slug={listing.slug} />
      )}

      <div className="mt-10">
        <ReviewFormWrapper listingSlug={listing.slug} />
        <ShowReviews reviews={listing.reviews} currentUserId={currentUserId} />
      </div>
    </div>
  );
}
