"use client"

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';



type User = {
  username: string,
  email:string
}


export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/check-auth`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.loggedIn) {
          setUser(data.user);
        }
      } catch (err) {
        console.log("Error checking auth", err);
      }
    };

    checkAuth();


      const handleStorage = () => {
        checkAuth(); // refetch if localStorage changes
      };

      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
      method: "GET",
      credentials: "include",
    });

    setUser(null);
  };

  return (
    <div>
      <nav className="flex items-center ">
        <div className="flex justify-center" style={{ width: "10%" }}>
          <Image
            src="/images/nestoraLogo.png"
            width={90}
            height={90}
            alt="logo"
            style={{ padding: "10px" }}
          />
        </div>

        <div className="flex justify-between" style={{ width: "90%" }}>
          <div className="flex items-center gap-3 mt-4 ml-5 ">
            <p>
              <Link href="/">Home</Link>
            </p>
            <p>
              <Link href="/">All listing</Link>
            </p>

            <p>
              {" "}
              <Link href="/NewListing">Add new Listing</Link>
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 mr-5">
            {!user ? (
              <>
                {" "}
                <p>
                  {" "}
                  <Link href="/login">login</Link>
                </p>
                <p>
                  <Link href="/signup">sign-up</Link>
                </p>
              </>
            ) : (
              <>
                <span>Hi, {user.username}</span>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}

           
          </div>
        </div>
      </nav>
    </div>
  );
}
