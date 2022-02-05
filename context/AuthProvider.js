import { useRouter } from "next/router";
import { createContext } from "react";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { onAuth } from "../firebase";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // hooks
  const router = useRouter();

  // state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuth((user) => {
      setUser(user);
      if (user) router.asPath === "/auth" && router.push("/");
      else router.asPath !== "/auth" && router.push("/landing");
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loader loading={loading} full /> : children}
    </AuthContext.Provider>
  );
}
