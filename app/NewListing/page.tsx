


// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { toast } from "react-toastify";
// import Image from "next/image";




// export default function NewListing() {
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

//   // ⭐ AUTH CHECK
//   useEffect(() => {
//     async function checkAuth() {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/listings/new`,
//           {
//             credentials: "include",
//           }
//         );

//         const data = await res.json();

//         if (res.status === 401) {
//           const currentPage = "/listings/new";

//           if (!toastShown.current) {
//             toastShown.current = true;
//             toast.error(data.message || "You must login first");
//           }

//           router.push(`/login?redirect=${currentPage}`);
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
//       newErrors.price = "Price must be a positive number";

//     if (!formData.location.trim()) newErrors.location = "Location is required";
//     if (!formData.country.trim()) newErrors.country = "Country is required";

//     return newErrors;
//   };

//   // ⭐ SUBMIT (NOW USING FORMDATA)
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const fd = new FormData();
//     fd.append("title", formData.title);
//     fd.append("description", formData.description);
//     fd.append("price", formData.price);
//     fd.append("location", formData.location);
//     fd.append("country", formData.country);

//     // ⭐ ONLY append file if selected
//     if (imageFile) {
//       fd.append("image", imageFile);
//     }

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`, {
//       method: "POST",
//       credentials: "include",
//       body: fd, // ⭐ NOT JSON
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
//       <h1 className="text-xl font-bold mb-2">New Listing</h1>

//       {/* Title */}
//       <div>
//         <label>Title</label>
//         <input
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         {errors.title && <p className="text-red-500">{errors.title}</p>}
//       </div>

//       {/* Description */}
//       <div>
//         <label>Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         {errors.description && (
//           <p className="text-red-500">{errors.description}</p>
//         )}
//       </div>

//       {/* Image File Input */}
//       <div>
//         <label>Image Upload</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="border p-2 w-full"
//         />
//       </div>

//       {/* Price */}
//       <div>
//         <label>Price</label>
//         <input
//           name="price"
//           type="number"
//           value={formData.price}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         {errors.price && <p className="text-red-500">{errors.price}</p>}
//       </div>

//       {/* Location */}
//       <div>
//         <label>Location</label>
//         <input
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         {errors.location && <p className="text-red-500">{errors.location}</p>}
//       </div>

//       {/* Country */}
//       <div>
//         <label>Country</label>
//         <input
//           name="country"
//           value={formData.country}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         {errors.country && <p className="text-red-500">{errors.country}</p>}
//       </div>

//       <button className="bg-blue-600 text-white p-2 rounded">Submit</button>
//     </form>
//   );
// }






import { Suspense } from "react";
import NewListingClient from "./NewListingClient";

export default function NewListingPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <NewListingClient />
    </Suspense>
  );
}
