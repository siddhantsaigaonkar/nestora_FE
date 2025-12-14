"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

export default function NewListingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toastShown = useRef(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/listings/new`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (res.status === 401) {
          if (!toastShown.current) {
            toastShown.current = true;
            toast.error(data.message || "You must login first");
          }

          router.push("/login?redirect=/NewListing");
          return;
        }

        setCheckingAuth(false);
      } catch (err) {
        console.log("Error:", err);
      }
    }

    checkAuth();
  }, []);

  if (checkingAuth) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Price must be positive";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => fd.append(key, value));

    if (imageFile) fd.append("image", imageFile);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`, {
      method: "POST",
      credentials: "include",
      body: fd,
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 flex flex-col gap-4"
    >
      <h1 className="text-xl font-bold">New Listing</h1>
      {/* form fields stay SAME */}
      <button className="bg-blue-600 text-white p-2 rounded">Submit</button>
    </form>
  );
}
