import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const Auth = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      let userCredentials = await createUserWithEmailAndPassword(auth, email, Password);
      setUser(userCredentials.user);
      navigate('/../bookings');
    } catch (err) {
      console.error(err);
    }
  };

  const signIn = async () => {
    setIsLoading(true);
    try {
     let userCredentials = await signInWithEmailAndPassword(auth, email, Password);
      setUser(userCredentials.user);
      navigate('/../bookings');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return <div style={{margin:"10%"}}> <h2> loading...</h2></div>
  }

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

        <button className="white" onClick={signIn}> Sign in </button>
        <button className="black" onClick={signUp}> Sign up </button>
      </div>
    </div>
  );
};
