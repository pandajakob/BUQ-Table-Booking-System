import { useState } from "react";
import { auth } from "../../config/firebase";
import { Loading } from "../loading.js";

export const Bookings = () => {
    const [isLoading, setIsLoading] = useState(false);


  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex">
      <div className="container">
        <h1> Bookings</h1>
      </div>
    </div>
  );
};
