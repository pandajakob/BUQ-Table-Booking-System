import { useEffect } from "react";
import { useParams } from 'react-router-dom'

export const BookTable = () => {
    const {restaurantId} = useParams();

    useEffect(() => {
        console.log("Restaurant ID:", restaurantId); // Should log the correct ID
      }, [restaurantId]);
    return (
      <div className="flex">
        <h3> Book table </h3> <br />
      </div>
    );
  };
  