// import { useMemo } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import React from "react";
import { env } from "../../src/env.mjs";

// // function home() {
// //   const { isLoaded } = useLoadScript({
// //     googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
// //   });

// //   if (!isLoaded) return <div>Loading...</div>;
// //   return <Map />;
// // }

// // export default function Map() {
// //   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

// //   return (
// //     <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
// //       <Marker position={center} />
// //     </GoogleMap>
// //   );
// // }

// const containerStyle = {
//   width: "400px",
//   height: "400px",
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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
    <LoadScript googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
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
