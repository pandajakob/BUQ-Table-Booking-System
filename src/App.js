import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./config/firebase";

import { NavBar } from "./components/navBar";
import { HomePage } from "./components/home";
import { Auth } from "./components/auth";
import { RestaurantSettings } from "./components/restaurant/settings";
import { Bookings } from "./components/restaurant/bookings";
import { NewRestaurant } from "./components/restaurant/newRestaurant";
import { Loading } from "./components/loading.js";

function App() {
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLoading, setIsLoading] = useState(true); // Track user authentication state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Update user state on auth state change
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    } else if (!user) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Clear user state on logout
    } catch (err) {
      console.error("Log Out Error:", err);
    }
  };

  return (
    <div className="App">
      <NavBar user={user} logout={logout} />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<Auth setUser={setUser} />}></Route>
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route
          path="/settings"
          element={<RestaurantSettings user={user} />}
        ></Route>
        <Route
          path="/newRestaurant"
          element={<NewRestaurant user={user} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
