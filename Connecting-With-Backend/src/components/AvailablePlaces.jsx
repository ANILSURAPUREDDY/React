import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((res) => setAvailablePlaces(res.places));
  // }, []);

  //By using asyn and awit

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        const respDate = await response.json();
        if (!response.ok) {
          throw new Error("Error occured while fetching Data..");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          const sortedPlaces = sortPlacesByDistance(
            respDate.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

        // navigator.geolocation.getCurrentPosition((position) => {
        //   const sortedPlaces = sortPlacesByDistance(
        //     respDate.places,
        //     position.coords.latitude,
        //     position.coords.longitude
        //   );
        //   setAvailablePlaces(sortedPlaces);
        //   setIsFetching(false);
        // });
      } catch (error) {
        setError({
          message: error.message || "Fallback message occured while fetching ",
        });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="Error Message" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      fetchingData="Fetching Data...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
