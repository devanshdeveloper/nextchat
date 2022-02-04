export default function Loader({ loading, full }) {
  return loading ? (
    <div
      className={`w-screen absolute left-0 top-0 bg-white flex items-center justify-center ${
        full ? "h-screen" : "h-[calc(100vh-48px)]"
      }`}
    >
      <div className="border-4 border-t-0 border-black animate-spin inline-block w-8 h-8 rounded-full">
        <div className="invisible">Loading...</div>
      </div>
    </div>
  ) : null;
}
