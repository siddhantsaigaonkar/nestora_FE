"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignupPage() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email:""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      // router.push("/")

      // Update navbar immediately
      window.dispatchEvent(new Event("auth-changed"));

      // redirect to homepage
      window.location.href = "/";
    } else {
     toast.error(data.message)
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2"
            required
          />
        </div>

        <div>
          <label>email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2"
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2"
            required
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: 15,
            padding: "8px 20px",
            background: "blue",
            color: "#fff",
            borderRadius: 4,
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
