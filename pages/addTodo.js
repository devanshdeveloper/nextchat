import { createRef, useState } from "react";
import { Alert, FormInput, Loader } from "../components";
import { addTodo } from "../firebase";

export default function AddTodo() {
  // input refs
  const titleRef = createRef();

  // state
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // handlers
  function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current.value;
    if (!title) return setAlert({ message: "Invalid Todo", type: "error" });
    setLoading(true);
    addTodo({
      title,
      completed: false,
    }).finally(() => setLoading(false));
  }

  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-48px)]">
        <div className="w-[min(80vw,400px)] bg-white rounded-lg shadow-lg h-5/6 flex items-center justify-around py-20 flex-col">
          <h1 className="text-2xl">Add Todo</h1>
          <Alert {...alert} />
          <form onSubmit={handleSubmit}>
            <FormInput
              ref={titleRef}
              id="titleInput"
              labelText="Title"
              type="text"
              name="title"
            />
            <input
              type="submit"
              className="btn block mx-auto"
              value="Add Todo"
            />
          </form>
        </div>
      </div>
      {loading && <Loader/>}
    </>
  );
}
