import React, { useRef } from "react";
import { auth } from "../config/firebase_config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const email = useRef();
  const password = useRef();

  const SignUpUser = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="block">
      <form onSubmit={SignUpUser}>
        <input
          className="border border-black"
          type="email"
          ref={email}
          placeholder="Email"
          required
        />
        <input
          className="border border-black"
          type="password"
          ref={password}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
