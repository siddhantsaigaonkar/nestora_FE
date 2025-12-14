
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthToast from "@/app/components/AuthToast";
import Image from "next/image";

// ================================
// TYPES
// ================================
type Listing = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  location: string;
  country: string;
  image: { url: string };
};

type FormData = {
  title: string;
  description: string;
  price: number;
  location: string;
  country: string;
  imageFile: File | null;
};

export default function EditListingForm({ listing }: { listing: Listing }) {
  const router = useRouter();

  // ✅ Initial form data (safe defaults)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: 0,
    location: "",
    country: "",
    imageFile: null,
  });

  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // ================================
  // ⭐ Populate form once listing is available
  // ================================
  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || "",
        description: listing.description || "",
        price: listing.price || 0,
        location: listing.location || "",
        country: listing.country || "",
        imageFile: null,
      });
    }
  }, [listing]);

  // ================================
  // ✅ Auth check
  // ================================
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:8001/api/check-auth", {
          credentials: "include",
        });
        const data = await res.json();
        setIsAuth(data.loggedIn);
      } catch (err) {
        setIsAuth(false);
      }
    }
    checkAuth();
  }, []);

  if (isAuth === null) return <p className="text-center">Checking...</p>;
  if (isAuth === false) return <AuthToast />;

  // ================================
  // ✅ Handlers
  // ================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("price", formData.price.toString());
    fd.append("location", formData.location);
    fd.append("country", formData.country);
    if (formData.imageFile) fd.append("image", formData.imageFile);

    try {
      const res = await fetch(
        `http://localhost:8001/api/listings/${listing.slug}`,
        {
          method: "PUT",
          credentials: "include",
          body: fd,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success("Listing updated!");
      // router.push(`/listings/${listing.slug}`);
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  // ================================
  // ✅ JSX
  // ================================
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Listing: {listing.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          className="border p-2 w-full"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
   
        />

        <textarea
          name="description"
          className="border p-2 w-full"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
 
        />

        <input
          type="number"
          name="price"
          className="border p-2 w-full"
          value={formData.price ?? 0}
          onChange={handleChange}
          placeholder="Price"
        
        />

        <input
          name="location"
          className="border p-2 w-full"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
    
        />

        <input
          name="country"
          className="border p-2 w-full"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
   
        />

        {/* ⭐ Image preview */}
        {(formData.imageFile || listing?.image?.url) && (
          <Image
            src={
              formData.imageFile
                ? URL.createObjectURL(formData.imageFile)
                : listing.image.url
            }
            alt="listing image"
            width={200}
            height={200}
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />

        <button
          className="bg-blue-600 text-white py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
