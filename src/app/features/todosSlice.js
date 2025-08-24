import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 1,
      text: "Complete online JavaScript course",
      completed: true,
    },
    {
      id: 2,
      text: "Jog around the park 3x",
      completed: false,
    },
    {
      id: 3,
      text: "10 minutes meditation",
      completed: false,
    },
    {
      id: 4,
      text: "Read for 1 hour",
      completed: false,
    },
    {
      id: 5,
      text: "Pick up groceries",
      completed: false,
    },
    {
      id: 6,
      text: "Complete Todo App on Frontend Mentor",
      completed: false,
    },
  ],
  backup: [],
};
let todos = [...initialState.todos];
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
      state.backup = [...state.todos];
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
      state.backup = [...state.todos];
    },
    editTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id == payload.id) {
          return {
            ...todo,
            title: payload.title,
            completed: payload.completed,
          };
        } else {
          return todo;
        }
      });
      state.backup = [...state.todos];
    },

    filter: (state, { payload }) => {
      if (payload === "all") {
        state.todos = state.backup;
      } else if (payload === "completed") {
        state.todos = state.backup.filter((item) => item.completed === true);
      } else if (payload === "active") {
        state.todos = state.backup.filter((item) => item.completed === false);
      }
    },
  },
});

export const { addTodo, removeTodo, editTodo, filter } = todosSlice.actions;
export default todosSlice.reducer;
