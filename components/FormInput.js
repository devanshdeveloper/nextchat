import { forwardRef } from "react";

export const FormInput = forwardRef(function StyledInput(
  { labelText, className, id, ...props },
  ref
) {
  return (
    <div className="my-3">
      <label htmlFor={id} className="text-md">
        {labelText}
      </label>
      <input
        {...props}
        ref={ref}
        id={id}
        className={`w-full p-2 rounded-md bg-slate-200 my-1 focus:bg-slate-300 ${className}`}
      />
    </div>
  );
});
