import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { Block, Card, Button, Text, COLORS } from "../../components/index";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import imageMarker from "../../assets/marker-128.png";

import JoinRide from "./JoinRide/JoinRide";
import CreateRide from "./CreateRide/CreateRide";

const BookTransport = props => {
  // Mode
  // 0 - Join Ride
  // 1 - Create Ride
  const [mode, setMode] = useState(0);

  const [loading, setLoading] = useState(false);

  const [region, setRegion] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
    /* latitudeDelta: 0.0922,
    longitudeDelta: 0.0421 */
  });
  const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    return location;
  };

  const getLocationPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    console.tron.log("status", status);
    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
  };
  const onRegionChange = region => {
    setRegion(region);
  };

  useEffect(() => {
    getLocationPermissions().then(response => {
      console.tron.log("done");
    });
    getCurrentLocation().then(location => {
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    });
  }, []);
  return (
    <Block safe>
      {region.latitude && (
        <MapView
          showsUserLocation={true}
          showsCompass={true}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={r => onRegionChange(r)}
        />
      )}

      <Block style={styles.markerFixed}>
        <Image style={styles.marker} source={imageMarker} />
      </Block>

      <KeyboardAvoidingView
        style={styles.bottom}
        keyboardVerticalOffset={64}
        behavior="padding"
      >
        <Card safe padding={10}>
          {loading ? (
            <Block center middle>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </Block>
          ) : (
            <React.Fragment>
              <Block row paddingLeft={20} paddingRight={20}>
                <Block flex={1}>
                  <Button
                    style={{
                      borderRadius: 0,
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                      height: 35
                    }}
                    outlined={mode ? true : false}
                    onPress={() => setMode(0)}
                  >
                    <Block center middle>
                      <Text
                        primary={mode ? true : false}
                        white={mode ? false : true}
                      >
                        JOIN RIDE
                      </Text>
                    </Block>
                  </Button>
                </Block>

                <Block flex={1}>
                  <Button
                    style={{
                      borderRadius: 0,
                      height: 35,
                      borderTopRightRadius: 12,
                      borderBottomRightRadius: 12
                    }}
                    outlined={mode ? false : true}
                    onPress={() => setMode(1)}
                  >
                    <Block center middle>
                      <Text
                        primary={mode ? false : true}
                        white={mode ? true : false}
                      >
                        CREATE RIDE
                      </Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              {mode ? (
                <CreateRide
                  region={region}
                  navigation={props.navigation}
                  setLoading={setLoading}
                />
              ) : (
                <JoinRide
                  region={region}
                  navigation={props.navigation}
                  setLoading={setLoading}
                />
              )}
            </React.Fragment>
          )}
        </Card>

        <SafeAreaView style={styles.bottomSafe} />
      </KeyboardAvoidingView>
    </Block>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  marker: {
    height: 32,
    width: 32
  },
  markerFixed: {
    left: "50%",
    marginLeft: -16,
    marginTop: -32,
    position: "absolute",
    top: "50%"
  },
  bottom: {
    bottom: 0,
    position: "absolute",
    width: "100%"
  },
  bottomSafe: {
    height: 0
  }
});

BookTransport.navigationOptions = {
  title: "Book transport"
};

export default BookTransport;
