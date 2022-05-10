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
import { onChangeLocsDualInputs } from "../../store/Locs/LocsReducer";

Geocode.setApiKey("AIzaSyB26LsBjwYe57N5r5K7Cuno288cIhkoAZQ");

const containerStyle = {
  width: "100%",
  height: "400px",
};

function LOCMap({ radius, locationLat, locationLong }) {
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
  const center = { lat: locationLat, lng: locationLong };

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

    if (state.mapPosition.lat !== 53.349804) {
      dispatch(onChangeLocsDualInputs(state.markerPosition.lat, "lat"));
      dispatch(onChangeLocsDualInputs(state.markerPosition.lng, "long"));
    } else {
      dispatch(onChangeLocsDualInputs(locationLat, "lat"));
      dispatch(onChangeLocsDualInputs(locationLong, "long"));
    }
  }, [locationLat]);

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

        dispatch(onChangeLocsDualInputs(newLat, "lat"));
        dispatch(onChangeLocsDualInputs(newLng, "long"));
      },
      (error) => {
        console.error(error);
      }
    );
  };
  return (
    <div style={{ width: "100%", margin: "10px 0" }}>
      {isLoaded && locationLat && locationLong ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {console.log("128", locationLat)}
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
                    lat: locationLat,
                    lng: locationLong,
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
                    lat: locationLat,
                    lng: locationLong,
                  }
            }
            radius={parseFloat(radius)}
            draggable={true}
            editable={true}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LOCMap;
