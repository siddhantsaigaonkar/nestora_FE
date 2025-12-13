

// "use client";

// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const redirectTo = searchParams.get("redirect") || "/";
//   // ⭐ NEW: If no redirect param → go home after login

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
//         method: "POST",
//         credentials: "include", // send + receive session cookie
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message);
//         return;
//       }

//       toast.success(data.message);

//       // ⭐ NEW: Redirect back to original page or home
//          window.location.href = "/";

//       // ⭐ OPTIONAL: If using cookies/session, you can force refresh:
//       // router.refresh();
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Login</h1>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className="border p-2"
//             required
//           />
//         </div>

//         <div style={{ marginTop: 10 }}>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border p-2"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             marginTop: 15,
//             padding: "8px 20px",
//             background: "green",
//             color: "#fff",
//             borderRadius: 4,
//           }}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }




import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}
