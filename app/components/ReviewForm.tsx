"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function StarRating({ rating, setRating }: { rating: number; setRating: any }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => setRating(num)}
          className="text-2xl cursor-pointer"
        >
          <span className={num <= rating ? "text-yellow-500" : "text-gray-300"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

export default function ReviewForm({ listingSlug }: { listingSlug: string }) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${listingSlug}/reviews`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, rating }),
        credentials: "include",
      }
    );

   const data = await res.json()
    if (res.ok) {

      toast.success(data.message)
      setComment("");
      setRating(0);
    } else {

      toast.error(data.message || "Error submitting review");
    }

    router.refresh(); // re-fetch data
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-5">Leave a review</h4>
      <label className="block font-medium">Rating</label>
      <StarRating rating={rating} setRating={setRating} />

      <label htmlFor="comment" className="block font-medium mt-2">
        Comment
      </label>
      <textarea
        name="comment"
        id="comment"
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your review here..."
      ></textarea>

      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white p-2 rounded cursor-pointer"
      >
        Submit Review
      </button>
    </form>
  );
}
