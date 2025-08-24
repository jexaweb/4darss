import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, editTodo } from "./app/features/todosSlice";
import { useState } from "react";
function App() {
  const [id, setId] = useState("");
  const [_title, setTitle] = useState("");
  const [_completed, setCompleted] = useState("");

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setCompleted(todo.completed);
    setId(todo.id);
  };

  const dispatch = useDispatch();
  const { todos } = useSelector((store) => store.todos);

  const hendleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const completed = formData.get("completed") !== null;

    if (_title) {
      dispatch(
        editTodo({
          id,
          title,
          completed,
        })
      );

      setTitle("");
      setCompleted("");
      setId("");
    } else {
      dispatch(
        addTodo({
          id: Math.random(),
          title,
          completed: completed,
        })
      );
    }

    e.target.reset();
  };
  return (
    <div className="bg-imge">
      <div className="container ">
        <div className="f">
          <div>
            {" "}
            <h1 className="app-title">Todo </h1>
          </div>
          <form className="todo-form" onSubmit={hendleSubmit}>
            {/* <div className="form-group">
              <label className="form-label">Completed</label>
            </div> */}
            <div className="form-group">
              <input
                name="completed"
                type="checkbox"
                className="checkbox__heder"
              />

              <input
                name="title"
                type="text"
                className="form-input"
                placeholder="Create a new todo…"
              />
            </div>
          </form>
          <ul>
            {todos &&
              todos.map((todo) => {
                return (
                  <li key={todo.id} className={"todo-item"}>
                    <h4
                      className={"todo-title"}
                      style={{ opacity: todo.completed && "0.1" }}
                    >
                      {todo.title}
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => dispatch(removeTodo(todo.id))}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-edit btn-small"
                        onClick={() => handleEdit(todo)}
                      >
                        Edit Todo
                      </button>
                    </h4>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
