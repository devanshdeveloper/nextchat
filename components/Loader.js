export default function Loader({
  height = "100vh",
  width = "100vw",
}) {
  return (
    <div
      className="absolute z-[100] flex items-center justify-center bg-dark-700"
      style={{ height, width }}
    >
      <Spinner />
    </div>
  );
}

export function Spinner() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <path
        d="M23 12C23 18.0751 18.0751 23 12 23"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}
