import React, { useState, useEffect } from "react";
import { Block, Text } from "../../components/index";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const BookTransport = props => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    return location;
  };

  const getLocationPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    console.log("status", status);
    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
  };

  useEffect(() => {
    getLocationPermissions().then(response => {
      console.log("done");
    });
    getCurrentLocation().then(location => {
      console.tron.log(location);
      const cloneCurrentLocation = {
        ...currentLocation
      };
      cloneCurrentLocation.latitude = location.coords.latitude;
      cloneCurrentLocation.longitude = location.coords.longitude;
      setCurrentLocation(cloneCurrentLocation);
    });
  }, []);

  return (
    <Block safe>
      <MapView style={{ flex: 1 }} region={currentLocation} />
    </Block>
  );
};

export default BookTransport;
