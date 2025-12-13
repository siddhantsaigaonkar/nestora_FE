import Image from "next/image";
import Link from "next/link";

type ListingCardProps = {
  _id: string;
  slug: string;
  title: string;
  price: number;
  image: {
    url: string;
  };
};

export default function ListingCard({
  _id,
  slug,
  title,
  price,
  image,
}: ListingCardProps)



{
  return (
    <div className="p-3 rounded flex flex-col justify-items-center items-center relative">
      <Link href={`/listings/${slug}`} style={{ cursor: "pointer" }}>
        <Image
          src={image.url}
          alt={title}
          width={400}
          height={300}
          style={{
            height: "18rem",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
        />
      </Link>

      <div className="text-center">
        <strong className="text-sm sm:text-base md:text-lg lg:text-xl">
          {title}
        </strong>
        <p>{price}/Night</p>
      </div>
    </div>
  );
}
