import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";

const containerStyle = {
  width: "400px",
  height: "400px",
};

type PropsType = {
  lat: number;
  lng: number;
};

function Map(props: PropsType) {
  const [lat, setLat] = useState(31.632036898637434);
  const [lng, setLng] = useState(-7.983678820018496);

  const center = { lat, lng };

  function handleClick(e: google.maps.MapMouseEvent) {
    setLat(Number(e.latLng.lat()));
    setLng(Number(e.latLng.lng()));
  }
  return (
    <LoadScript googleMapsApiKey="AIzaSyB7asgpEVzrsdFCpnWfUj9D6AsD7ci_VJI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleClick}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
