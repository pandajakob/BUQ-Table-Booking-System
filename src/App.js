import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { auth } from "./config/firebase";

import { HomePage } from "./components/home";
import { Auth } from "./components/auth";
import { RestaurantSettings } from "./components/restaurant/settings";
import { Bookings } from "./components/restaurant/bookings";

function App() {
  const [user, setUser] = useState(null); // Track user authentication state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Update user state on auth state change
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

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
      <nav id="header" className="flex">
        <h3> Buq.dk </h3>
        {user ? (
          <ul className="flex">
            <li>
              <NavLink className="button white" to="/bookings">
                Bookings
              </NavLink>
            </li>
            <li>
              <NavLink className="button white" to="/settings">
                settings
              </NavLink>
            </li>
            <li>
            <NavLink  to="/auth">
                <button className="button red" onClick={logout}> Log ud</button>
            </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="flex">
            <li>
              <NavLink to="/auth">
                <p className="button blue">Log ind</p>
              </NavLink>
            </li>
          </ul>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<Auth setUser={setUser}/>}></Route>
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route path="/settings" element={<RestaurantSettings user={user} />}></Route>

      </Routes>
    </div>
  );
}

export default App;
