import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";

export const Auth = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
 
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, Password);
    } catch (err) {
      console.error(err);
    }
  };

  const signIn = async () => {
    try {
     let userCredentials = await signInWithEmailAndPassword(auth, email, Password);
      setUser(userCredentials.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <div className="container">
        <h3> Log ind</h3>
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signIn}> Sign in </button>
        <button onClick={signUp}> Sign up </button>
      </div>
    </div>
  );
};
