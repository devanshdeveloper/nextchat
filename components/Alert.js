export default function Alert({ message, type }) {
  return message ? (
    <div
      className={`w-3/4 h-12 border-2 rounded-md mx-auto relative ${
        type === "error"
          ? "border-red-500 bg-red-200"
          : "border-green-500 bg-green-200"
      }`}
    >
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {message}
      </p>
    </div>
  ) : null;
}
