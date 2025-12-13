
import ListingClient from "@/app/components/ListingClient";

export default async function ListingPage({ params }: { params: { slug: string } }) {
   const { slug } = await params;
  // Just pass the slug to the client component
  return <ListingClient slug={slug} />;
}
