import { useEffect, useState, useCallback} from "react";
import { db } from "../../config/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Loading } from "../loading.js";


export const RestaurantSettings = ({ user }) => {

  const [isLoading, setIsLoading] = useState(true);

  // restaurant states
  const [restaurant, setRestaurant] = useState("");
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
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [tableDuration, setTableDuration] = useState(0);

  const format = "MM/DD/YYYY";

  const documentPath = "restaurants/" + user?.uid;
  const docRef = doc(db, documentPath);

  const getRestaurant = async () => {
    try {
      const data = await getDoc(docRef);
      setRestaurant(data.data());
      console.log("successfully fetched restaurant");
    } catch (err) {
      console.log(err);
    }
  };

  // import the opening hours to correct object format:
  const getOpeningHours = () => {
    if (restaurant.openingHours && typeof restaurant.openingHours === "object") {
      setOpeningHours(restaurant.openingHours);
    } else {
      console.log("Invalid openingHours data:", restaurant.openingHours);
      setOpeningHours({});
    }
  };

  //converts firestore timestamps to dates
  const getClosedDates = () => {
    const formattedClosedDates = restaurant.datesClosed.map((date) => {
      return new DateObject().set({ date: date.toDate(), format: format });
    });
    setDatesClosed(formattedClosedDates);
  };

  useEffect(() => {
    setIsLoading(true);
    getRestaurant();
  }, [ user]);

  useEffect(() => {
    if (restaurant) {
      getOpeningHours();
      getClosedDates();
      setNumberOfSeats(restaurant.numberOfSeats);
      setTableDuration(restaurant.tableDuration);
      setIsLoading(false); // Set to false when restaurant data is available
    }
  }, [restaurant]);

  // import the closed dates to correct date format for the datePicker

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

  const handleTableDurationChange = (duration) => {
    setTableDuration(Number(duration));
  };

  const handlenumberOfSeatsChange = (seats) => {
    setNumberOfSeats(Number(seats));
  };

  // Saves the changes to firestore
  const onSubmitChanges = async () => {
    setIsLoading(true);
    try {
      await setDoc(docRef, {
        restaurantName: restaurant.restaurantName,
        email: user.email,
        numberOfSeats: numberOfSeats,
        tableDuration: tableDuration,
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1> {restaurant.restaurantName} </h1>
      <h3> {restaurant.email} </h3>
      <div className="flex">
        <div className="container" id="openingHours">
          
          <h2 style={{marginBottom: "15%"}}> Åbningstider</h2>
          
          <form className="flex">
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
                <label>
                  <b>{weekDaysInDanish(day)}</b>
                </label>
                <div style={{minWidth: "300px"}}>
                  <input
                    type="time"
                    value={openingHours[day]?.[0] || ""}
                    onChange={(e) =>
                      handleOpeningHourChange(day, 0, e.target.value)
                    }
                    disabled={openingHours[day]?.[2] ? false : true}
                  />
                  <label>
                    <b>-</b>
                  </label>
                  <input
                    type="time"
                    value={openingHours[day]?.[1] || ""}
                    onChange={(e) =>
                      handleOpeningHourChange(day, 1, e.target.value)
                    }
                    disabled={openingHours[day]?.[2] ? false : true}
                  />
                </div>
                <div>
                  <label> lukket: </label>
                  <input
                    type="checkbox"
                    checked={openingHours[day]?.[2] ? false : true}
                    onChange={(e) =>
                      handleClosedStatusChange(day, e.target.checked)
                    }
                  />
                </div>
                <span className="blackLine"></span>
              </div>
            ))}
          </form>
        </div>

        <div className="container" id="datesClosed">
          <div>
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
            <br />
          </div>

          <div>
            <h2> max. pladser</h2>
            <input
              id="seats"
              type="number"
              placeholder="40"
              value={numberOfSeats <= 0 ? "" : numberOfSeats}
              min={0}
              onChange={(e) => handlenumberOfSeatsChange(e.target.value)}
            />
            <br />
            <br />
          </div>
          <div>
            <h2> Bord varighed </h2>
            <input
              id="tableDuration"
              type="number"
              min={0}
              max={1440} // max 24 hours table duration
              placeholder="0"
              value={tableDuration <= 0 ? "" : tableDuration}
              onChange={(e) => handleTableDurationChange(e.target.value)}
            />
            <label> min </label>
            <br />
            <br />
          </div>
          <br />
        </div>
      </div>
      <button className="blue" onClick={onSubmitChanges}>
        {" "}
        Gem ændringer{" "}
      </button>
    </div>
  );
};
