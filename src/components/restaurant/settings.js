import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import { getDoc, doc, addDoc, setDoc, collection } from "firebase/firestore";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Loading } from "../loading.js";

export const RestaurantSettings = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [restaurant, setRestaurant] = useState("");

  // newRestaurant states
  const [datesClosed, setDatesClosed] = useState([]);
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
        console.log("succesfully fetchec restaurants");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getRestaurant();
  }, [user]);

  const getOpeningHours = () => {
    if (
      restaurant.openingHours &&
      typeof restaurant.openingHours === "object"
    ) {
      setOpeningHours(restaurant.openingHours);
    } else {
      console.log("Invalid openingHours data:", restaurant.openingHours);
      setOpeningHours({});
    }
  };

  const handleOpeningHourChange = () => {};

  const saveRestaurantData = () => {};

  const format = "MM/DD/YYYY";
  const getClosedDates = () => {
    // Check if restaurant and datesClosed are defined
    const formattedClosedDates = restaurant.datesClosed.map((date) => {
      return new DateObject().set({ date: date.toDate(), format: format });
    });
    setDatesClosed(formattedClosedDates);
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
            <label>Mandag</label>
            <input
              type="time"
              value={openingHours.monday?.[0] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.monday, 0, e.target.value)
              }
            />
            <input
              type="time"
              value={openingHours.monday?.[1] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.monday, 0, e.target.value)
              }
            />
            <br />

            <label>Tirsdag</label>
            <input
              type="time"
              value={openingHours.tuesday?.[0] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.tuesday, 0, e.target.value)
              }
            />
            <input
              type="time"
              value={openingHours.tuesday?.[1] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.tuesday, 0, e.target.value)
              }
            />
            <br />

            <label>Onsdag</label>
            <input
              type="time"
              value={openingHours.wednesday?.[0] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.wednesday, 0, e.target.value)
              }
            />
            <input
              type="time"
              value={openingHours.wednesday?.[1] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.wednesday, 0, e.target.value)
              }
            />
            <br />

            <label>Torsdag</label>
            <input
              type="time"
              value={openingHours.thursday?.[0] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.thursday, 0, e.target.value)
              }
            />
            <input
              type="time"
              value={openingHours.thursday?.[1] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.thursday, 0, e.target.value)
              }
            />
            <br />

            <label>Fredag</label>
            <input
              type="time"
              value={openingHours.friday?.[0] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.friday, 0, e.target.value)
              }
            />
            <input
              type="time"
              value={openingHours.friday?.[1] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.friday, 0, e.target.value)
              }
            />
            <br />

            <label>Lørdag</label>
            <input
              type="time"
              value={openingHours.saturday?.[0] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.saturday, 0, e.target.value)
              }
            />
            <input
              type="time"
              value={openingHours.saturday?.[1] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.saturday, 0, e.target.value)
              }
            />
            <br />

            <label>Søndag</label>
            <input
              type="time"
              value={openingHours.sunday?.[0] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.sunday, 0, e.target.value)
              }
            />
            <input
              type="time"
              value={openingHours.sunday?.[1] || ""}
              onChange={(e) =>
                handleOpeningHourChange(openingHours.sunday, 0, e.target.value)
              }
            />
            <br />
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
      <button className="blue"> Gem ændringer </button>
    </div>
  );
};
