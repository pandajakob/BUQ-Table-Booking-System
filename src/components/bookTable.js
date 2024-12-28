import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, documentId } from "firebase/firestore";
import { Loading } from "./loading.js";
import { db } from "../config/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const BookTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const getRestaurant = async () => {
      setIsLoading(true);
      const documentPath = `restaurants/${restaurantId}`;
      const docRef = doc(db, documentPath);
      try {
        const data = await getDoc(docRef);
        console.log("dataExists", data.exists)
        if (data.exists) {
          console.log("successfully fetched restaurant");
          console.log(data);
          setRestaurant(data.data());
        } else {
          console.log("Restaurant not found");
        }
        
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getRestaurant();
  }, [restaurantId]);

 

  if (isLoading) {
    return <Loading />;
  } else if (!restaurant) {
    return <h3> Kunne ikke finde restaurant med id: {restaurantId}</h3>
  }
  return (
    <div style={{justifyItems: "center"}}>
      <h1> Book bord </h1> <br />

      <div className="container"> 
        <h2> {restaurant.restaurantName} </h2>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

      </div>
    </div>
  );
};
