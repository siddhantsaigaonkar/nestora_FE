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

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginClient() {
  const router = useRouter();

  // ❗ DO NOT suspend this component
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🔥 LOGIN CLICKED"); // <-- YOU MUST SEE THIS

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log("🔥 RESPONSE RECEIVED", res.status);

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Login successful");
    window.location.href = redirectTo;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}
