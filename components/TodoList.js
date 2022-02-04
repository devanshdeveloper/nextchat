import { cloneElement } from "react";
import { Children } from "react";
import { toggleCompleted, deleteTodo } from "../firebase";

export default function TodoList({ todosData, children }) {
  const keys = todosData && Object.keys(todosData);
  const values = todosData && Object.values(todosData);

  return (
    <div className="grid m-4 gap-4 lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2">
      {Children.map(children, (e) => {
        return cloneElement(e, {
          className: `${
            e.props.className || ""
          } bg-white p-2 rounded-md shadow-md`,
        });
      })}
      {values && values.length ? (
        values.map(({ title, completed }, i) => (
          <div
            key={keys[i]}
            className="bg-white p-2 rounded-md shadow-md flex justify-between items-center select-none"
            onDoubleClick={() => toggleCompleted(keys[i], !completed)}
          >
            <span className={`${completed ? "line-through" : "none"}`}>
              {title}
            </span>
            <div className="flex items-center gap-2">
              <button className="text-2xl" onClick={() => deleteTodo(keys[i])}>
                x
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white p-2 rounded-md shadow-md">
          <span>Add A Todo To Get Started</span>
        </div>
      )}
    </div>
  );
}
