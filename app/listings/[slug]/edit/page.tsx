


import EditListingForm from "@/app/clientComponent/EditListingForm";

async function getListing(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Listing not found");

  return res.json(); // returns { listing, currentUserId }
}

export default async function EditListingPage({ params }: any) {
  const { slug } = await params; // ✅ Needed for your Next.js version

  const data = await getListing(slug);

  return <EditListingForm listing={data.listing} />; // ✅ Must access data.listing
}
