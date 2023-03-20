// import { useMemo } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import React from "react";
// import { env } from "../../src/env.mjs";

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

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Child components, such as markers, info windows, etc. */}
//       <>
//         <Marker position={center} clickable={true} />
//       </>
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// }

// export default React.memo(MyComponent);
