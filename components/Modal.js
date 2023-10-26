import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Spinner } from "./Loader";

export default function Modal({
  show,
  text,
  children,
  loading,
  setModal,
  onSuccess,
  onClose,
}) {
  return (
    <div
      className={`fixed ${
        show ? "top-0" : "top-[100%]"
      } left-0 z-50 flex h-screen w-screen items-center justify-center bg-white bg-opacity-50 p-6 transition-all duration-200`}
    >
      <div className="brand-scrollbar relative max-h-full w-[min(800px,95vw)] overflow-auto rounded-2xl bg-white  p-10 text-left shadow-lg transition-all duration-200">
        <AiOutlineClose
          className="absolute right-5 top-5 cursor-pointer text-xl opacity-60 transition-all duration-200 hover:opacity-100"
          onClick={() => setModal(false)}
        />
        <div className="flex w-full flex-col items-center gap-4">
          {text && (
            <p className="max-w-[368px] text-center text-lg font-medium text-dark-100 lg:text-left">
              {text}
            </p>
          )}
          {loading ? (
            <div className="absolute inset-0 z-50 flex h-full items-center justify-center ">
              <Spinner />
            </div>
          ) : (
            children
          )}
        </div>
        <div className="mt-8 flex justify-end gap-2">
          {onClose && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setModal(false);
                onClose();
              }}
            >
              Nope
            </button>
          )}
          {onSuccess && (
            <button
              className="btn btn-default"
              onClick={() => {
                setModal(true);
                onSuccess();
              }}
            >
              Yes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
