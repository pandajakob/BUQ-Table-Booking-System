import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Loading } from "../loading.js";
import { useNavigate } from "react-router-dom";


export const NewRestaurant = ({ user }) => {
  const [restaurantName, setRestauantName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initRestaurant = async () => {
    setIsLoading(true);
    try {
        const docRef = doc(db, "restaurants", user.uid);
        await setDoc(docRef,{
            restaurantName: restaurantName,
            email: user.email,
            numberOfSeats: 0,
            tableDuration: 0,
            datesClosed: [],
            openingHours: {monday: ["", "", true], tuesday: ["", "", true],wednesday: ["", "", true], thursday: ["", "", true],friday: ["", "", true],saturday: ["", "", true],sunday: ["", "", true]},
            restaurantId: user.uid,
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
