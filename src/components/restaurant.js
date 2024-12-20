import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";



export const Restaurant = ({user, logout}) => {
  const [restaurant, setRestaurant] = useState("");
  useEffect(() => {
    const getRestaurant = async () => {
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
        const filteredData = data.data();
        setRestaurant(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getRestaurant();
  }, [user]);



  const initRestaurant = () => {};
  
  const addClosedDate = () => {};
  
  const format = "MM/DD/YYYY";
  const [dates, setDates] = useState([]);
  useEffect(() => {
    const setClosedDates = () => {
      if (restaurant && restaurant.closedDates) { // Check if restaurant and closedDates are defined
        const formattedClosedDates = restaurant.closedDates.map((date) => {
          return new DateObject().set({ date: new Date(date), format: format });
        });
        setDates(formattedClosedDates);
      }
    };
    setClosedDates();
  }, [restaurant]); // Adding `restaurant` as a dependency to run this effect when it changes


  useEffect(() => {
      console.log("dates:", dates);
  }, [dates]); // Runs whenever `dates` changes

  

  return (
    <div>
      <div>



      </div>
      <div>
        <h1> {restaurant.name} </h1>
        <h3> {restaurant.email} </h3>
        <form>
          <label htmlFor="closedDate"> Lukket dato:</label> <br />
          <DatePicker
            value={dates}
            onChange={setDates}
            multiple
            sort
            format={format}
            calendarPosition="bottom-center"
            plugins={[<DatePanel />]}
          /> <br />
          <button onClick={addClosedDate}> Gem ændringer</button> <br />


          <input id="openingHours" />
        </form>
        <ul>
          {dates.map((date, index) => (
            <li key={index}>{date.format()}</li>
          ))}
        </ul>
      </div>
      <button onClick={logout}> logout</button> 
    </div>
  );
};
