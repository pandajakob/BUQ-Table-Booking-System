import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Loading } from "../loading.js"

export const RestaurantSettings = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [restaurant, setRestaurant] = useState("");

  // newRestaurant states
  const [closedDates, setClosedDates] = useState([]);
  const [openingHours, setOpeningHours] = useState(Object);
  const [seats, setSeats] = useState(0);
  const [tableDuration, setTableDuration] = useState(0);

  useEffect(() => {
    const getRestaurant = async () => {
      setIsLoading(true);

      const documentPath = "restaurants/" + user.uid;
      const document = doc(db, documentPath);
      console.log("docPath:", documentPath);

      if (!auth?.currentUser) {
        console.log("User not logged in.");
        setRestaurant("");
        return <div></div>;
      }

      try {
        const data = await getDoc(document);
        setRestaurant(data.data());
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getRestaurant();
  }, [user]);

  const getOpeningHours = () => {
    if (restaurant.openingHours && typeof restaurant.openingHours === "object") {
      setOpeningHours(restaurant.openingHours);
    } else {
      console.log("Invalid openingHours data:", restaurant.openingHours);
      setOpeningHours({});
    }
  };

  const handleOpeningHourChange = () => {

  };

  const saveRestaurantData = () => {};

  const format = "MM/DD/YYYY";
  const getClosedDates = () => {
    // Check if restaurant and closedDates are defined
    const formattedClosedDates = restaurant.closedDates.map((date) => {
      return new DateObject().set({ date: date.toDate(), format: format });
    });
    setClosedDates(formattedClosedDates);
  };

  useEffect(() => {
    if (restaurant && restaurant.openingHours) {
      getOpeningHours();
      getClosedDates();
    }
  }, [restaurant]); // Adding `restaurant` as a dependency to run this effect when it changes


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
            {Object.entries(openingHours).map(([day, times], index) => (
              <div key={index}>
                <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                <input
                  type="time"
                  value={times[0] || ""}
                  onChange={(e) =>
                    handleOpeningHourChange(day, 0, e.target.value)
                  }
                />
                <label> - </label>
                <input
                  type="time"
                  value={times[1] || ""}
                  onChange={(e) =>
                    handleOpeningHourChange(day, 1, e.target.value)
                  }
                />
              </div>
            ))}
          </form>
        </div>
        <div style={{ margin: "3%" }}>
          <div className="container" id="closedDates">
            <h2> Datoer lukket: </h2> <br />
            <DatePicker
              style={{ padding: "8px", margin: "5%" }}
              value={closedDates}
              onChange={setClosedDates}
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
      <button className="blue"> Gem ændringer </button>
    </div>
  );
};
