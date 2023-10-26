import Head from "next/head";
import { useState } from "react";
import { Alert, FormInput, Loader } from "../components";
import { createUser, LogUserIn, signUserIn } from "../firebase";
import { useToggle } from "../hooks";
import { interpretError } from "../utilities";
import Image from "next/image";

export default function UserForm() {
  // hooks
  const [type, toggleType, isSignin] = useToggle("Sign In", "Log In");

  // state
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  // handlers
  function handleSubmit(e) {
    e.preventDefault();
    const { displayName, email, password } = formData;
    setLoading(true);
    (isSignin() ? createUser : LogUserIn)(email, password, displayName).catch(
      handleError
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleError(e) {
    setAlert({ message: interpretError(e.code), type: "error" });
  }

  function handleSignin() {
    signUserIn().catch(handleError);
  }

  return (
    <>
      <Head>
        <title>{`${type} | Chat App`}</title>
      </Head>
      <div className="flex justify-center items-center h-[calc(100vh-48px)]">
        <div className="w-[min(80vw,400px)] bg-white rounded-lg shadow-lg flex items-center justify-evenly flex-col p-4 gap-4">
          <h1 className="text-2xl">{type}</h1>
          <Alert {...alert} />
          <form onSubmit={handleSubmit}>
            {isSignin() && (
              <FormInput
                onChange={handleChange}
                value={formData.displayName}
                id="nameInput"
                labelText="Name"
                type="text"
                name="displayName"
              />
            )}
            <FormInput
              id="emailInput"
              labelText="Email"
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              autoComplete="username email"
            />
            <FormInput
              id="passInput"
              labelText="Password"
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              autoComplete={isSignin() ? "new-password" : "current-password"}
            />
            <input
              type="submit"
              className="btn block mx-auto"
              value={isSignin() ? "Sign In" : "Log In"}
              onChange={handleChange}
            />
          </form>
          <div>
            {isSignin() ? "Already have an account?" : "Need an account?"}
            <span className="font-medium mx-1" onClick={toggleType}>
              {type}
            </span>
          </div>
          <button
            onClick={handleSignin}
            className="bg-white border-2 border-black flex gap-3 items-center px-3 py-2 rounded-md "
          >
            <Image src="/google.svg" width={24} height={24}  alt="google"/>
            Continue With Google
          </button>
        </div>
      </div>
      <Loader loading={loading} />
    </>
  );
}
