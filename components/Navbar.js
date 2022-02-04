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

  // functions
  function handleUser() {
    signUserOut();
  }

  return (
    <>
      <nav
        className={`w-screen bg-white flex justify-around items-center fixed ${
          isScrolled ? "h-14 shadow-lg" : "h-12"
        }`}
      >
        <div className="font-medium text-2xl">Noter</div>
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
          {user && (
            <li>
              <button className="btn" onClick={handleUser}>
                Sign Out
              </button>
            </li>
          )}
        </ul>
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
