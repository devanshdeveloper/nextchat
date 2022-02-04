import { Navbar } from "../components";
import AuthProvider from "../context/AuthProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </AuthProvider>
  );
}

export default MyApp;
