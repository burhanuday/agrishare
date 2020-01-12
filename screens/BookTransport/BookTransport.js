import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import { Block, Text, Card, Input, Button } from "../../components/index";
import MapView, { Marker } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import imageMarker from "../../assets/marker-128.png";

const BookTransport = props => {
  const [region, setRegion] = useState({
    latitude: 18.960546,
    longitude: 72.8170935,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

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
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    });
  }, []);

  const onRegionChange = region => {
    setRegion(region);
  };

  return (
    <Block safe>
      <MapView
        showsUserLocation={true}
        showsCompass={true}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={r => onRegionChange(r)}
      />
      <Block style={styles.markerFixed}>
        <Image style={styles.marker} source={imageMarker} />
      </Block>
      {/* <SafeAreaView style={styles.footer}>
        <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text>
      </SafeAreaView> */}
      <KeyboardAvoidingView
        style={styles.bottom}
        keyboardVerticalOffset={64}
        behavior="padding"
      >
        <Card safe padding={10}>
          <Text bold h3 black>
            Where to?
          </Text>
          <Input
            marginTop={15}
            onChangeText={val => console.tron.log(val)}
            value=""
            placeholder="Enter destination"
          />

          <Input
            marginTop={10}
            onChangeText={val => console.tron.log(val)}
            value=""
            placeholder="Enter capacity"
          />

          <Block row>
            <Button
              flex={1}
              marginRight={5}
              onPress={() => setShowDatePicker(!showDatePicker)}
              marginTop={10}
              primary
              outlined
            >
              <Block middle center>
                <Text primary bold h3>
                  CHOOSE START
                </Text>
              </Block>
            </Button>
            <Button
              flex={1}
              marginLeft={5}
              onPress={() => setShowDatePicker(!showDatePicker)}
              marginTop={10}
              primary
              outlined
            >
              <Block middle center>
                <Text primary bold h3>
                  CHOOSE END
                </Text>
              </Block>
            </Button>
          </Block>

          <Button
            onPress={() => setShowDatePicker(true)}
            marginTop={10}
            primary
          >
            <Block middle center>
              <Text white bold h3>
                SCHEDULE
              </Text>
            </Block>
          </Button>

          {showDatePicker && (
            <DateTimePicker
              value={new Date("2020-06-12T14:42:42")}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                console.tron.log(event, date);
              }}
            />
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
    height: 30
  }
  /* footer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    bottom: 0,
    position: "absolute",
    width: "100%"
  },
  region: {
    color: "#fff",
    lineHeight: 20,
    margin: 20
  } */
});

BookTransport.navigationOptions = {
  title: "Book transport"
};

export default BookTransport;
