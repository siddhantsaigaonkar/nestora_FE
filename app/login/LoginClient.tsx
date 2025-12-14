// "use client";

// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function LoginClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const redirectTo = searchParams.get("redirect") || "/";

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
//         credentials: "include",
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

//       // ✅ redirect correctly
//       window.location.href = redirectTo;
//     } catch (error) {
//       console.error(error);
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




"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // 🔥 VERY IMPORTANT
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check-auth`, {
        credentials: "include",
      });

      toast.success("Login successful");
      router.push(redirectTo);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
