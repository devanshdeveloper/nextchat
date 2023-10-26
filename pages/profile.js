import { useAuth } from "../context";
import { Alert, FormInput, Loader } from "../components";
import { createRef, useState } from "react";
import { updateUser, uploadUserPhoto } from "../firebase";
import { interpretError } from "../utilities";
import Head from "next/head";
import Image from "next/image";

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

  function handlePhotoUpload(e) {
    setLoading(true);
    uploadUserPhoto(e.target.files[0])
      .then(() =>
        setAlert({ message: "Profile photo updated", type: "success" })
      )
      .catch((e) => {
        setAlert({ message: interpretError(e.code), type: "error" });
      });
  }

  return (
    <>
      <Head>
        <title>Profile | Noter</title>
      </Head>
      <div className="flex h-60 items-center justify-center">
        <Image
          src={user?.photoURL}
          className="rounded-full w-[min(150px,50vw)]"
          height={200}
          width={200}
          alt="Profile"
        />
        <input type="file" onChange={handlePhotoUpload} />
      </div>
      <div className="bg-white lg:w-1/3 md:w-2/3 w-10/12 rounded-md mx-auto">
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
            defaultValue={user?.displayName}
          />
          <FormInput
            ref={emailRef}
            labelText="Email"
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
          />
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
      <Loader loading={loading} />
    </>
  );
}
