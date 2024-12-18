import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { getDoc, collection, doc } from "firebase/firestore"

export const Restaurant = () => {
    const [restaurant, setRestaurant] = useState("");
    const restaurantsCollection = collection(db, "restaurants");
   
    const documentPath = "restaurants/" + auth?.currentUser?.email;
    const document = doc(db, documentPath);
    
        const getRestaurant = async () => {
            if (!auth?.currentUser) {
                console.log("User not logged in.");
                return (<div></div>)
            }
            try {
              const data = await getDoc(document);
              const filteredData = data.data();
              console.log(filteredData);
            } catch (err) {
                console.log(err);
            }
        }

   

    return (
      <div>
        <button onClick={getRestaurant}> Get data </button>
      </div>
    );
  };
  