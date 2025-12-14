// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { toast } from "react-toastify";

// export default function NewListingClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const toastShown = useRef(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     location: "",
//     country: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);

//   const [errors, setErrors] = useState({
//     title: "",
//     description: "",
//     price: "",
//     location: "",
//     country: "",
//   });

//   useEffect(() => {
//     async function checkAuth() {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/listings/new`,
//           { credentials: "include" }
//         );

//         const data = await res.json();

//         if (res.status === 401) {
//           if (!toastShown.current) {
//             toastShown.current = true;
//             toast.error(data.message || "You must login first");
//           }

//           router.push("/login?redirect=/NewListing");
//           return;
//         }

//         setCheckingAuth(false);
//       } catch (err) {
//         console.log("Error:", err);
//       }
//     }

//     checkAuth();
//   }, []);

//   if (checkingAuth) {
//     return <p className="text-center mt-10">Checking authentication...</p>;
//   }

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleFileChange = (e: any) => {
//     setImageFile(e.target.files[0]);
//   };

//   const validate = () => {
//     const newErrors: any = {};
//     if (!formData.title.trim()) newErrors.title = "Title is required";
//     if (!formData.description.trim())
//       newErrors.description = "Description is required";
//     if (!formData.price || Number(formData.price) <= 0)
//       newErrors.price = "Price must be positive";
//     if (!formData.location.trim()) newErrors.location = "Location is required";
//     if (!formData.country.trim()) newErrors.country = "Country is required";
//     return newErrors;
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const fd = new FormData();
//     Object.entries(formData).forEach(([key, value]) => fd.append(key, value));

//     if (imageFile) fd.append("image", imageFile);

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`, {
//       method: "POST",
//       credentials: "include",
//       body: fd,
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       toast.error(data.message);
//       return;
//     }

//     toast.success(data.message);
//     router.push("/");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-xl mx-auto p-4 flex flex-col gap-4"
//     >
//       <h1 className="text-xl font-bold">New Listing</h1>
//       {/* form fields stay SAME */}
//       <button className="bg-blue-600 text-white p-2 rounded">Submit</button>
//     </form>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function NewListingClient() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Price must be positive";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      fd.append(key, value.toString())
    );
    if (imageFile) fd.append("image", imageFile);

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings`,
        {
          method: "POST",
          credentials: "include",
          body: fd,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create listing");

      toast.success(data.message);
      router.push("/"); // Redirect to home after creating listing
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 flex flex-col gap-4"
    >
      <h1 className="text-xl font-bold">New Listing</h1>

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      {errors.title && <p className="text-red-500">{errors.title}</p>}

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      {errors.description && (
        <p className="text-red-500">{errors.description}</p>
      )}

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      {errors.price && <p className="text-red-500">{errors.price}</p>}

      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      {errors.location && <p className="text-red-500">{errors.location}</p>}

      <input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />
      {errors.country && <p className="text-red-500">{errors.country}</p>}

      <input type="file" onChange={handleFileChange} />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

