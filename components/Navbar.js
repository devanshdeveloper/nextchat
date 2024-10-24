import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context";
import { signUserOut } from "../firebase";
import { useEventListener } from "../hooks";
import Image from "next/image";

export default function Navbar({ children }) {
  // hooks
  const { user } = useAuth();

  return (
    <>
      <nav
        className={`w-screen bg-white flex justify-around items-center fixed z-10 h-16`}
      >
        <div className="font-medium text-2xl">NextChat</div>
        {user && (
          <ul className="flex gap-3 text-xl items-center">
            {[
              ["Home", "/"],
              ["Profile", "/profile"],
            ].map(([text, href], i) => (
              <li key={i}>
                <Link href={href}>{text}</Link>
              </li>
            ))}
            <li>
              <img
                src={user?.photoURL}
                width={50}
                height={50}
                alt={"profile"}
                className="rounded-full w-8"
              />
            </li>
            <li>
              <button className="btn" onClick={signUserOut}>
                Sign Out
              </button>
            </li>
          </ul>
        )}
      </nav>
      {children}
    </>
  );
}
