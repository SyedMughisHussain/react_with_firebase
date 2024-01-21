import React, { useRef, useState } from "react";
import { db } from "../config/firebase_config";
import { collection, addDoc } from "firebase/firestore";

const Home = () => {
  const todoText = useRef();
  const [todos, setTodos] = useState([]);

  const addTodo = async (event) => {
    event.preventDefault();
    const todoValue = todoText.current.value;
    todos.push({todo: todoValue});
    const docRef = await addDoc(collection(db, "todos"), {
      todo: todoValue,
    });
    console.log("Document written with ID: ", docRef.id);
    setTodos([...todos]);
    todoText.current.value = "";
  };

  console.log(todos);

  return (
    <div className="w-screen h-screen flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white h-fit w-fit p-5 mt-10">
        <p className="text-center font-bold text-3xl">Todo App</p>
        <form onSubmit={addTodo}>
          <input
            className="border focus:outline-none mt-5 border-black p-2 w-[450px]"
            type="text"
            ref={todoText}
            placeholder="Add Todo"
          />
          <button className="ml-5 bg-purple-500 text-white p-2 ">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
