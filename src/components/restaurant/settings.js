import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import {
  getDoc,
  doc,
  addDoc,
  setDoc,
  collection,
  Timestamp,
} from "firebase/firestore";

import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Loading } from "../loading.js";
import { useNavigate } from "react-router-dom";
export const RestaurantSettings = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [restaurant, setRestaurant] = useState("");

  // newRestaurant states
  const [datesClosed, setDatesClosed] = useState([]);
  const [openingHours, setOpeningHours] = useState({
    monday: ["", "", true],
    tuesday: ["", "", true],
    wednesday: ["", "", true],
    thursday: ["", "", true],
    friday: ["", "", true],
    saturday: ["", "", true],
    sunday: ["", "", true],
  });
  const [seats, setSeats] = useState(0);
  const [tableDuration, setTableDuration] = useState(0);

  const documentPath = "restaurants/" + user?.uid;
  const docRef = doc(db, documentPath);

  useEffect(() => {
    const getRestaurant = async () => {
      setIsLoading(true);
      try {
        const data = await getDoc(docRef);
        setRestaurant(data.data());

        console.log("succesfully fetchec restaurants");

      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getRestaurant();
  }, [user]);

  // import the opening hours to correct object format:
  useEffect(() => {
    const getOpeningHours = () => {
      setIsLoading(true);
      if (
        restaurant.openingHours &&
        typeof restaurant.openingHours === "object"
      ) {
        setOpeningHours(restaurant.openingHours);
      } else {
        console.log("Invalid openingHours data:", restaurant.openingHours);
        setOpeningHours({});
      }
      setIsLoading(false);
    };
    getOpeningHours();
  }, [restaurant]); // Adding `restaurant` as a dependency to run this effect when it changes

  // import the closed dates to correct date format for the datePicker
  const format = "MM/DD/YYYY";
  useEffect(() => {
    const getClosedDates = () => {
      // Check if restaurant and datesClosed are defined
      const formattedClosedDates = restaurant.datesClosed.map((date) => {
        return new DateObject().set({ date: date.toDate(), format: format });
      });
      setDatesClosed(formattedClosedDates);
    };
  }, [restaurant]); // Adding `restaurant` as a dependency to run this effect when it changes

  const handleOpeningHourChange = (day, openOrClose, timeValue) => {
    const newOpeningHours = { ...openingHours };
    newOpeningHours[day][openOrClose] = timeValue;
    setOpeningHours(newOpeningHours);
  };

  const handleClosedStatusChange = (day, isClosed) => {
    const newOpeningHours = { ...openingHours };
    newOpeningHours[day][2] = !isClosed;
    setOpeningHours(newOpeningHours);
    console.log(newOpeningHours);
  }

  const saveRestaurantData = async () => {
    setIsLoading(true);
    try {
      await setDoc(docRef, {
        name: restaurant.name,
        email: user.email,
        numberOfSeats: seats,
        datesClosed: [],
        openingHours: openingHours,
      });
      console.log("saved changes successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const weekDaysInDanish = (weekDay) => {
    switch (weekDay.toLowerCase()) {
      case "monday":
        return "Mandag";
      case "tuesday":
        return "Tirsdag";
      case "wednesday":
        return "Onsdag";
      case "thursday":
        return "Torsdag";
      case "friday":
        return "Fredag";
      case "saturday":
        return "Lørdag";
      case "sunday":
        return "Søndag";
      default:
        return "Invalid weekday";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1> {restaurant.name} </h1>
      <h3> {restaurant.email} </h3>
      <div className="flex">
        <div className="container">
          <h2> Åbningstider</h2>
          <form>
            {[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ].map((day) => (
              <div key={day}>
                <label>{weekDaysInDanish(day)}</label>
                <input
                  type="time"
                  value={openingHours[day]?.[0] || ""}
                  onChange={(e) =>
                    handleOpeningHourChange(day, 0, e.target.value)
                  }
                  disabled={openingHours[day]?.[2] ? false : true}
                />
                <input
                  type="time"
                  value={openingHours[day]?.[1] || ""}
                  onChange={(e) =>
                    handleOpeningHourChange(day, 1, e.target.value)
                  }
                  disabled={openingHours[day]?.[2] ? false : true}
                />
                <label> Lukket: </label>
                <input
                  type="checkbox"
                  checked={openingHours[day]?.[2] ? false : true}
                  onChange={(e) =>
                    handleClosedStatusChange(day, e.target.checked)
                  }
                />
              </div>
            ))}
          </form>
        </div>
        <div style={{ margin: "3%" }}>
          <div className="container" id="datesClosed">
            <h2> Datoer lukket: </h2> <br />
            <DatePicker
              style={{ padding: "8px", margin: "5%" }}
              value={datesClosed}
              onChange={setDatesClosed}
              multiple
              sort
              format={format}
              calendarPosition="bottom-center"
              plugins={[<DatePanel />]}
            />
            <br />
          </div>
          <div className="container">
            <h2> max. pladser</h2>
            <input id="seats" type="number" placeholder="40" />
          </div>
          <div className="container">
            <h2> Bord varighed </h2>
            <input id="tableDuration" type="number" placeholder="120" />
            <label> min </label>
          </div>
        </div>
      </div>
      <button className="blue" onClick={saveRestaurantData}>
        {" "}
        Gem ændringer{" "}
      </button>
    </div>
  );
};
