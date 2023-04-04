import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context";
import { signUserOut } from "../firebase";
import { useEventListener } from "../hooks";

export default function Navbar({ children }) {
  // hooks
  const { user } = useAuth();

  // state
  const [isScrolled, setIsScrolled] = useState(false);

  // events
  useEventListener("scroll", () => {
    const isTop = window.scrollY > 100;
    if (isTop !== isScrolled) setIsScrolled(isTop);
  });

  return (
    <>
      <nav
        className={`w-screen bg-white flex justify-around items-center fixed z-10 ${
          isScrolled ? "h-14 shadow-lg" : "h-12"
        }`}
      >
        <div className="font-medium text-2xl">NextChat</div>
        {user && (
          <ul className="flex gap-3 text-xl items-center">
            {[
              ["Home", "/"],
              ["Profile", "/profile"],
            ].map(([text, href], i) => (
              <li key={i}>
                <Link href={href}>
                  <a>{text}</a>
                </Link>
              </li>
            ))}
            <li>
              <img src={user?.photoURL} className="rounded-full w-8" />
            </li>
            <li>
              <button className="btn" onClick={signUserOut}>
                Sign Out
              </button>
            </li>
          </ul>
        )}
      </nav>
      <div
        className={`w-screen relative  ${
          isScrolled
            ? "h-[calc(100vh-56px)] top-14"
            : "h-[calc(100vh-48px)] top-12"
        }`}
      >
        {children}
      </div>
    </>
  );
}
