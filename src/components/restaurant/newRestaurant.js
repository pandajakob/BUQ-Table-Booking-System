import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import { getDoc, doc, addDoc, setDoc, collection } from "firebase/firestore";
import { Loading } from "../loading.js";
import { useNavigate } from "react-router-dom";
import { Bookings } from "./bookings.js";

export const NewRestaurant = ({ user }) => {
  const [restaurantName, setRestauantName] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();

  const initRestaurant = async () => {
    setIsLoading(true);
    const collectionRefference = collection(db, "restaurants");
    try {
        const docRef = doc(db, "restaurants", user.uid);
        await setDoc(docRef,{
            name: restaurantName,
            email: user.email,
            numberOfSeats: 0,
            datesClosed: [],
            openingHours: {monday: ["", ""], tuesday: ["", "", true],wednesday: ["", "", true], thursday: ["", "", true],friday: ["", "", true],saturday: ["", "", true],sunday: ["", "", true]},

        });

        console.log("success");
    } catch (err) {
      console.log(err);
    } finally {
        navigate("../settings")
      setIsLoading(false);
    }

  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex">
      <form className="container">
        <h2> Hvad hedder din restaurant? </h2>
        <input type="text" id="restaurant-name" onChange={(e) => {setRestauantName(e.target.value)}} />
        <button className="blue" onClick={initRestaurant}> Videre </button>
      </form>
    </div>
  );
};
