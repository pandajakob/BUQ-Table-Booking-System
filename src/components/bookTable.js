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
  const [bookingIsDone, setBookingIsDone] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhoneNumber, setBookingPhoneNumber] = useState("");
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
      const q = query(
        collection(db, "bookings"),
        where("restaurantId", "==", restaurantId)
      );
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((booking) => {
          bookings.push(booking.data());
        });
        setBookingsForChosenDates(bookings);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAllBookingsForChosenDate();
  }, [restaurant, startDate, restaurantId]);

  console.log("bookings:", bookingsForChosenDates);
  const submitBooking = async (e) => {
    e.preventDefault();
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
      setBookingIsDone(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  } else if (!restaurant) {
    return <h3> Kunne ikke finde restaurant med id: {restaurantId}</h3>;
  } else if (bookingIsDone) {
    return (
      <div className="flex">
        <div className="container">
          <h3> Tak for at bestille bord hos {restaurant.name}</h3>
          <p> dato: {startDate.toDateString()} klokken: ... </p>
          <p> du vil modtage en bekræftelse på {bookingEmail}</p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ justifyItems: "center" }}>
      <h1> Book bord </h1> <br />
      <div className="container">
        <h2> {restaurant.restaurantName} </h2>
        <form onSubmit={submitBooking}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <br />
          <select>
            <option value="08:00">08:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="02:00">02:00 PM</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Navn"
            min="2"
            value={bookingName}
            onChange={(name) => setBookingName(name.target.value)}
            required
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={bookingEmail}
            onChange={(email) => setBookingEmail(email.target.value)}
            required
          />{" "}
          <br />
          <input
            type="tel"
            min="8"
            placeholder="Telefon"
            value={bookingPhoneNumber}
            onChange={(phone) => setBookingPhoneNumber(phone.target.value)}
            required
          />{" "}
          <br />
          <button className="blue" type="submit">
            Book bord
          </button>
        </form>
      </div>
    </div>
  );
};
