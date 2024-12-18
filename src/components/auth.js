import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signOut  } from "firebase/auth";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
 
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, Password);
    } catch (err) {
      console.error(err);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
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

      <button onClick={logout}> Log out </button>

    </div>
  );
};
