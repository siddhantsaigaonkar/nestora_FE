"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type Review = {
  _id: string;
  comment: string;
  rating: number;
  createdAt?: string;
  author: {
    _id: string;
    username: string;
    email: string;
  } | null;
};

type ShowReviewsProps = {
  reviews: Review[];
  currentUserId: string | null;
};

const ShowReviews = ({ reviews, currentUserId }: ShowReviewsProps) => {
  const [reviewList, setReviewList] = useState<Review[]>(reviews);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Failed to delete review");
      }

      // Remove the deleted review from state without reloading
      setReviewList(reviewList.filter((r) => r._id !== id));
      toast.success("Review deleted successfully!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-10">
      <h4 className="mb-5 text-lg font-semibold">Reviews</h4>

      {reviewList.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="space-y-4">
          {reviewList.map((review) => (
            <li key={review._id} className="border p-3 rounded">
              <p>{review.author ? review.author.username : "Unknown user"}</p>

              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="mb-1">{review.comment}</p>

              <small className="text-gray-500">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleString()
                  : "Date not available"}
              </small>

              {/* Only show delete button if current user is the author */}
              {review.author?._id === currentUserId && (
                <button
                  onClick={() => handleDelete(review._id)}
                  className="border cursor-pointer px-2 py-1 mt-2 rounded text-white bg-red-500"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowReviews;
