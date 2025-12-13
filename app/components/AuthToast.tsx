"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AuthToast() {
  const router = useRouter();
  const shown = useRef(false); // ✅ track if toast already shown

  useEffect(() => {
    if (!shown.current) {
      toast.error("You must be logged in to access this page!");
      shown.current = true; // mark as shown
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  }, [router]);

  return null;
}
