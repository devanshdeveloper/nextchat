import { useState } from "react";
import { Alert, FormInput, Loader } from "../components";
import { createUser, LogUserIn } from "../firebase";
import { useToggle } from "../hooks";
import { interpretError } from "../utilities";

export default function UserForm() {
  // hooks
  const [type, toggleType, isSignin] = useToggle("signin", "login");

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
      (e) => setAlert({ message: interpretError(e.code), type: "error" })
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-48px)]">
        <div className="w-[min(80vw,400px)] bg-white rounded-lg shadow-lg h-5/6 flex items-center justify-evenly flex-col">
          <h1 className="text-2xl">{isSignin() ? "Sign In" : "Log In"}</h1>
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
              {isSignin() ? "Log In" : "Sign In"}
            </span>
          </div>
        </div>
      </div>
      <Loader loading={loading} />
    </>
  );
}
