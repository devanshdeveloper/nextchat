import Head from "next/head";
import { createRef, useEffect, useState } from "react";
import { Loader, TodoList } from "../components";
import { addTodo, onTodos } from "../firebase";

export default function Home() {
  // hooks
  const titleRef = createRef();

  // state
  const [todos, setTodos] = useState({});
  const [loading, setLoading] = useState(true);

  // functions
  function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current.value;
    titleRef.current.value = "";
    addTodo({ title, completed: false });
  }

  useEffect(() => {
    return onTodos((s) => {
      if (s.exists()) setTodos(s.val());
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Home | Noter</title>
      </Head>
      <div>
        <h1 className="ml-3 pt-2 text-xl">Todos</h1>
        <TodoList todosData={todos}>
          <form onSubmit={handleSubmit}>
            <input
              className="w-full h-full"
              ref={titleRef}
              type="text"
              name="todo"
              placeholder="Add a todo"
            />
          </form>
        </TodoList>
      </div>
      <Loader loading={loading} />
    </>
  );
}
