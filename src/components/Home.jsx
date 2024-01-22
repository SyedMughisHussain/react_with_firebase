import React, { useEffect, useRef, useState } from "react";
import { db } from "../config/firebase_config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Home = () => {
  const todoText = useRef();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    renderTodo();
  }, []);

  const renderTodo = async () => {
    setTodos([]);
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const obj = {
        ...doc.data(),
        docId: doc.id,
      };
      todos.push(obj);
      setTodos([...todos]);
      console.log(doc.id, " => ", doc.data());
    });
  };

  const addTodo = async (event) => {
    event.preventDefault();
    const todoValue = todoText.current.value;
    const docRef = await addDoc(collection(db, "todos"), {
      todo: todoValue,
    });
    todos.push({ todo: todoValue, docId: docRef.id });
    setTodos([...todos]);
    console.log("Document written with ID: ", docRef.id);
    todoText.current.value = "";
  };

  const editTodo = async (index) => {
    const newValue = prompt("Enter the new value to enter.", todos[index].todo);
    const todoRef = doc(db, "todos", todos[index].docId);
    await updateDoc(todoRef, {
      todo: newValue,
    });
    todos[index].todo = newValue;
    setTodos([...todos]);
  };

  const deleteTodo = async (index) => {
    await deleteDoc(doc(db, "todos", todos[index].docId));
    todos.splice(index, 1);
    setTodos([...todos]);
  };
  console.log(todos);

  return (
    <div className="w-screen h-screen flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-gray-200 h-fit w-fit p-5 mt-10">
        <p className="text-center font-bold text-3xl">Todo App</p>
        <form onSubmit={addTodo}>
          <input
            className="border focus:outline-none mt-5 border-black p-3 w-[450px]"
            type="text"
            ref={todoText}
            placeholder="Add Todo"
            required
          />
          <button className="ml-5 bg-purple-500 text-white p-2 ">Add</button>
        </form>
        {todos.length === 0 ? (
          <h1 className="text-center text-2xl mt-5">No Todo Added Yet...</h1>
        ) : (
          todos.map((item, index) => {
            return (
              <div
                className="flex bg-white justify-between p-2 mt-2 w-[450px]"
                key={index}
              >
                <p className="text-[18px]">{item.todo}</p>
                <div>
                  <button
                    onClick={() => {
                      editTodo(index);
                    }}
                    className="bg-green-600 p-1 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteTodo(index);
                    }}
                    className="bg-red-500 ml-2 p-1 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
