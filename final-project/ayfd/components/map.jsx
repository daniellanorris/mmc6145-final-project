import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapComponent = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.MAPS_API}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        {/* Add markers, polygons, or other map components here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;