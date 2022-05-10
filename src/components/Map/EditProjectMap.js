import React, { useEffect, useRef, useState } from "react";
import Geocode from "react-geocode";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { getArea, getCity, getState } from "../../util/MapsUtil";
import { useDispatch, useSelector } from "react-redux";
import { onChangeProjectInputs } from "../../store/Projects/ProjectsReducer";

Geocode.setApiKey("AIzaSyB26LsBjwYe57N5r5K7Cuno288cIhkoAZQ");

const containerStyle = {
  width: "100%",
  height: "400px",
};

function EditProjectMap({ radius, projectLat, projectLong }) {
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCAOnNDfeA7T9gaFY2NJSd6VLDQ6jl9US8",
  });

  const [state, setState] = useState({
    address: "",
    city: "",
    area: "",
    state: "",
    mapPosition: {
      lat: 53.349804,
      lng: -6.26031,
    },
    markerPosition: {
      lat: 53.349804,
      lng: -6.26031,
    },
  });
  const center = { lat: projectLat, lng: projectLong };

  useEffect(() => {
    Geocode.fromLatLng(state.mapPosition.lat, state.mapPosition.lng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state = getState(addressArray);

        console.log("city", city, area, state);

        setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          mapPosition: {
            lat: 53.349804,
            lng: -6.26031,
          },
          markerPosition: {
            lat: 53.349804,
            lng: -6.26031,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [projectLat]);

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state1 = getState(addressArray);
        setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state1 ? state1 : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
        dispatch(onChangeProjectInputs(newLat, "lat"));
        dispatch(onChangeProjectInputs(newLng, "long"));
      },
      (error) => {
        console.error(error);
      }
    );
  };

  console.log("123", projectLat);
  return (
    <div style={{ width: "100%", margin: "10px 0" }}>
      {isLoaded && projectLat && projectLong ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <Marker
            name={"Dolores park"}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            position={
              state.mapPosition.lat !== 53.349804
                ? {
                    lat: state.markerPosition.lat,
                    lng: state.markerPosition.lng,
                  }
                : {
                    lat: projectLat,
                    lng: projectLong,
                  }
            }
          />
          <Circle
            center={
              state.mapPosition.lat !== 53.349804
                ? {
                    lat: state.markerPosition.lat,
                    lng: state.markerPosition.lng,
                  }
                : {
                    lat: projectLat,
                    lng: projectLong,
                  }
            }
            radius={parseFloat(radius)}

            // draggable={true}
            // editable={true}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default EditProjectMap;
