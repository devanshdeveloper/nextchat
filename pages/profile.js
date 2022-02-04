import { useAuth } from "../context";
import { Alert, FormInput, Loader } from "../components";
import { createRef, useState } from "react";
import { updateUser } from "../firebase";
import { interpretError } from "../utilities";

export default function Profile() {
  // input refs
  const nameRef = createRef();
  const emailRef = createRef();

  // hooks
  const { user } = useAuth();

  // state
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // functions
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    updateUser(nameRef.current.value, emailRef.current.value)
      .then(() => setAlert({ message: "Profile updated", type: "success" }))
      .catch((e) => {
        setAlert({ message: interpretError(e.code), type: "error" });
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <div className="flex h-60 items-center justify-center">
        <img
          src={user.photoURL}
          className="rounded-full w-[min(150px,50vw)] "
        />
      </div>
      <div className="bg-white lg:w-1/3 w-2/3 rounded-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex p-3 justify-center flex-col"
        >
        <Alert {...alert} />
          <FormInput
            ref={nameRef}
            labelText="Display Name"
            id="displayName"
            name="displayName"
            type="text"
            defaultValue={user.displayName}
          />
          <FormInput
            ref={emailRef}
            labelText="Email"
            id="email"
            name="email"
            type="email"
            defaultValue={user.email}
          />
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
      <Loader loading={loading} />
    </>
  );
}
