"use client";

import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";

type User = { _id: string; username: string; email: string } | null;

export default function ReviewFormWrapper({
  listingSlug,
}: {
  listingSlug: string;
}) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data && data._id ? data : null));
  }, []);

  if (!user) return null; // hide review form if not logged in

  return <ReviewForm listingSlug={listingSlug} />;
}
