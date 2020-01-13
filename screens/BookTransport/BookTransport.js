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
import PlacesAutoComplete from "./PlacesAutoComplete/PlacesAutoComplete";
import moment from "moment";
import axios from "../../axios/axios";

const BookTransport = props => {
  const [region, setRegion] = useState({
    latitude: 18.960546,
    longitude: 72.8170935,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState({
    visible: false,
    date: null
  });

  const [showEndDatePicker, setShowEndDatePicker] = useState({
    visible: false,
    date: null
  });

  const [destination, setDestination] = useState(null);
  const [capacity, setCapacity] = useState(null);

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

  const createTransportRequest = () => {};

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

      <KeyboardAvoidingView
        style={styles.bottom}
        keyboardVerticalOffset={64}
        behavior="padding"
      >
        <Card safe padding={10}>
          <Text bold h3 black>
            Where to?
          </Text>
          <PlacesAutoComplete onChange={setDestination} />

          <Input
            marginTop={10}
            onChangeText={val => setCapacity(val)}
            value={capacity}
            placeholder="Enter capacity"
            keyboardType="number-pad"
          />

          <Block row>
            <Button
              flex={1}
              marginRight={5}
              onPress={() => {
                setShowStartDatePicker({
                  ...showStartDatePicker,
                  visible: true
                });
              }}
              marginTop={10}
              primary
              outlined
            >
              <Block middle center>
                <Text primary bold h3>
                  {moment(showStartDatePicker.date).format("DD-MM-YYYY") ===
                  "Invalid date"
                    ? "CHOOSE START"
                    : moment(showStartDatePicker.date).format("DD-MM-YYYY")}
                </Text>
              </Block>
            </Button>

            <Button
              flex={1}
              marginLeft={5}
              onPress={() => {
                setShowEndDatePicker({
                  ...showEndDatePicker,
                  visible: true
                });
              }}
              marginTop={10}
              primary
              outlined
            >
              <Block middle center>
                <Text primary bold h3>
                  {moment(showEndDatePicker.date).format("DD-MM-YYYY") ===
                  "Invalid date"
                    ? "CHOOSE END"
                    : moment(showEndDatePicker.date).format("DD-MM-YYYY")}
                </Text>
              </Block>
            </Button>
          </Block>

          <Button marginTop={10} primary>
            <Block middle center>
              <Text white bold h3>
                SCHEDULE
              </Text>
            </Block>
          </Button>

          {showStartDatePicker.visible && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                setShowStartDatePicker({
                  visible: false,
                  date: date
                });
                console.tron.log(event, date);
              }}
            />
          )}

          {showEndDatePicker.visible && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                setShowEndDatePicker({
                  visible: false,
                  date: date
                });
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
    height: 0
  }
});

BookTransport.navigationOptions = {
  title: "Book transport"
};

export default BookTransport;
