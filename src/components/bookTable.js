import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Loading } from "./loading.js";
import { db } from "../config/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export const BookTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [bookingsForChosenDates, setBookingsForChosenDates] = useState([]);
  //const [availableTimesForChosenDate, setAvailableTimesForChosenDate] = useState([]);

    // get restaurant from url param id
  useEffect(() => {
    const getRestaurant = async () => {
      setIsLoading(true);
      const documentPath = `restaurants/${restaurantId}`;
      const docRef = doc(db, documentPath);
      try {
        const data = await getDoc(docRef);
        if (data.exists) {
          console.log("successfully fetched restaurant");
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

  useEffect(() => {
    const getAllBookingsForChosenDate = async () => {
      setIsLoading(true);
      // const midnightThisMorning = (new Date()).setHours(0,0,0,0);
      const bookings = [];
      const q = query(collection(db, "bookings"), where("restaurantId", "==", restaurantId));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((booking) => {
            bookings.push(booking.data());
        })
        setBookingsForChosenDates(bookings);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAllBookingsForChosenDate();
  }, [restaurant, startDate, restaurantId]);

  console.log("bookings:", bookingsForChosenDates)
  const submitBooking = async () => {
    setIsLoading(true);
    const colRef = collection(db, "bookings");
    try {
      await addDoc(colRef, {
        name: "Peter",
        mail: "jegerpeter@mail.dk",
        phoneNumber: "+4528686702",
        date: startDate,
        time: "18:00",
        restaurantId: restaurantId,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  } else if (!restaurant) {
    return <h3> Kunne ikke finde restaurant med id: {restaurantId}</h3>;
  }
  return (
    <div style={{ justifyItems: "center" }}>
      <h1> Book bord </h1> <br />
      <div className="container">
        <h2> {restaurant.restaurantName} </h2>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        {}
      </div>
      <div>
        <button className="blue" onClick={submitBooking}>
          {" "}
          Book bord
        </button>
      </div>
    </div>
  );
};
