"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthToast from "./AuthToast";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [showAuthToast, setShowAuthToast] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${slug}/delete`,
        {
          method: "DELETE",
          credentials: "include", // important to send cookies
        }
      );

      if (res.status === 401) {
        // user not logged in
        setShowAuthToast(true);
        return;
      }

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Listing deleted successfully!");
        router.push("/");
      } else {
        toast.error(data.message || "Failed to delete listing");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <>
      {showAuthToast && <AuthToast />}
      <button
        onClick={handleDelete}
        style={{ padding: "10px", cursor: "pointer" }}
        className="inline-flex items-center rounded-md bg-red-50 px-4 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10"
      >
        Delete
      </button>
    </>
  );
}
