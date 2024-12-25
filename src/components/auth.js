import { useState } from "react";
import { Loading } from "./loading.js";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = ({ setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    setIsLoading(true);
    try {
      let userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        Password
      );
      setUser(userCredentials.user);
      navigate("/../newRestaurant");
    } catch (err) {
      setError(err.code.slice(5));
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    setIsLoading(true);
    try {
      let userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        Password
      );
      setUser(userCredentials.user);
      navigate("/../bookings");
    } catch (err) {
        setError(err.code.slice(5));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex">
      <div className="container" id="loginContainer">
        <h3> Log ind</h3>
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="white" onClick={signIn}>
          {" "}
          Sign in{" "}
        </button>
        <button className="black" onClick={signUp}>
          {" "}
          Sign up{" "}
        </button>
        <p style={{color : "red"}}> {error} </p>

      </div>
    </div>
  );
};
