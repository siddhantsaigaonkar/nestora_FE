"use client";

import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { useEffect, useState } from "react";

// define user type
type User = {
  _id: string;
  username: string;
  email: string;
} | null;

export default function OwnerButtons({
  ownerId,
  slug,
}: {
  ownerId: string;
  slug: string;
}) {
  // tell TypeScript that user state can be User or null
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
      credentials: "include",
    })
      .then((res) => res.json())

      .then((data) => {
        // make sure we only set user if it has _id
        if (data && data._id) setUser(data);
        else setUser(null);
      });
  }, []);

  if (!user) return null; // not logged in
  if (user._id !== ownerId) return null; // not owner

  return (
    <div className="flex gap-3">
      <Link href={`/listings/${slug}/edit`}>
        <button
          style={{ padding: "10px", cursor: "pointer" }}
          className="inline-flex items-center rounded-md bg-blue-50 px-4 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10"
        >
          Edit
        </button>
      </Link>
      <DeleteButton slug={slug} />
    </div>
  );
}
