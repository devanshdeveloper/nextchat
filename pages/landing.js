import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>NextChat</title>
      </Head>
      <div className="flex justify-around items-center h-[calc(100vh-48px)]">
        <div className="lg:w-[50vw] s:w-[80vw]">
          <div className="lg:text-4xl s:text-xl">
            <span className="font-bold">NextChat</span> is a simple, easy-to-use
          </div>
          <div className="lg:text-xl sm:text-lg mb-4 mt-2">
          Say hello to a faster and more convenient way to stay in touch. Register now and unlock the full potential of our chat app.
          </div>
          <Link href="/auth">
            <a className="btn">Register</a>
          </Link>
        </div>
        <div className="lg:block s:hidden">
          <Image
            src="/landing.svg"
            width={500}
            height={500}
            alt="Manage Your Notes Using Noter"
          />
        </div>
      </div>
    </>
  );
}
