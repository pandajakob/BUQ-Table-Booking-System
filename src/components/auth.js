import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
 
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, Password);
      console.log("signed in as", auth.currentUser.email);
    } catch (err) {
      console.error(err);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, Password);
      console.log("signed in as", auth.currentUser.email);
    } catch (err) {
      console.error(err);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("signed out")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
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

      <button onClick={logout}> Log out </button>

    </div>
  );
};
