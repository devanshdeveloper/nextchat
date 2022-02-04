import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex justify-around items-center h-[calc(100vh-48px)]">
      <div className="lg:w-[50vw] s:w-[80vw]">
        <div className="lg:text-4xl s:text-xl">
          <span className="font-bold">Noter</span> is a simple, easy-to-use
        </div>
        <div className="lg:text-xl sm:text-lg mb-4 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          quod id! Voluptatum itaque sunt, dolore officia praesentium
          voluptatibus repellendus est? Quisquam provident magnam modi nemo
          recusandae odit dolorem illum! Quo?
        </div>
        <Link href="/signin">
          <a className="btn"> Get Started </a>
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
  );
}
