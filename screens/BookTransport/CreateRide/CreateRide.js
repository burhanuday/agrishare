import React, { useState, useEffect } from "react";
import { AsyncStorage, StyleSheet } from "react-native";
import { Block, Text, Input, Button, COLORS } from "../../../components/index";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TruckInfoModal from "./TruckInfoModal";
import {
  create_ride,
  pick_destination,
  edit_truck_info,
  departure
} from "../../../helpers/languageHelper";

import moment from "moment";
import axios from "../../../axios/axios";
import Axios from "axios";

const todaysDate = new Date();
todaysDate.setDate(todaysDate.getDate() + 5);

const CreateRide = props => {
  const [locale, setLocale] = useState("en");
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState({
    visible: false,
    date: todaysDate
  });

  useEffect(() => {
    const setDefaultLanguage = async () => {
      const loc = await AsyncStorage.getItem("locale");
      setLocale(loc);
    };

    setDefaultLanguage();
  });

  const [destination, setDestination] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [licensePlate, setLicensePlate] = useState("");
  const [truckMake, setTruckMake] = useState("");
  const [showTruckInfoModal, setShowTruckInfoModal] = useState(false);
  const [isPerishable, setIsPerishable] = useState(false);
  const [isFragile, setIsFragile] = useState(false);

  const createTransportRequest = async () => {
    let errors = [];

    if (!destination || !destination.geometry) {
      errors.push("Pick a destination");
    }
    if (!capacity) {
      errors.push("Enter a capacity");
    }
    if (!showDepartureDatePicker.date) {
      errors.push("Select a departure start date");
    }
    if (!licensePlate) {
      errors.push("Enter license plate number in truck info");
    }
    if (!truckMake) {
      errors.push("Enter truck make in truck info");
    }

    if (errors.length > 0) {
      let errorMessage = errors.join("\n");
      alert(errorMessage);
      return;
    }

    Axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${props.region.latitude},${props.region.longitude}&destination=${destination.geometry.lat},${destination.geometry.lng}&key=AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ`
    )
      .then(async response => {
        console.tron.log(response.data.routes[0].overview_polyline.points);
        const polyline = response.data.routes[0].overview_polyline.points;
        props.setLoading(true);

        const _id = await AsyncStorage.getItem("_id");
        console.tron.log("userId", _id);

        const formData = new FormData();
        formData.append("sourceLat", props.region.latitude);
        formData.append("sourceLng", props.region.longitude);
        formData.append("destLat", destination.geometry.lat);
        formData.append("destLng", destination.geometry.lng);
        formData.append("vehicleModel", truckMake);
        formData.append("vehicleLicensePlate", licensePlate);
        formData.append("capacityAvailable", Number(capacity));
        formData.append("isPerishable", isPerishable);
        formData.append("isFragile", isFragile);
        formData.append(
          "departure",
          moment(showDepartureDatePicker.date).format("YYYY-MM-DD")
        );
        formData.append("polyline", polyline);

        console.tron.log(formData);
        axios
          .post(
            `/journey?userId=${_id}&vehicleId=5e1a8ba59017533b948be08c`,
            formData
          )
          .then(response => {
            //console.tron.log(response);
            if (Number(response.data.error) === 0) {
              alert(response.data.message);
              props.navigation.pop();
            } else {
              alert(response.data.message);
            }
          })
          .catch(error => {
            console.tron.log(error);
            alert("There was an error with the request");
          })
          .finally(() => props.setLoading(false));
      })
      .catch(error => {
        console.tron.log(error);
        alert("Unknown error occured");
      });
  };

  return (
    <React.Fragment>
      <Block center>
        <Text h3 bold primary>
          {create_ride(locale)}
        </Text>
      </Block>
      <Button
        flex={1}
        marginRight={5}
        onPress={() => {
          props.navigation.push("DestinationPicker", {
            setDestination: geometry => {
              setDestination(geometry);
              console.log(geometry);
              props.navigation.pop();
            }
          });
        }}
        marginTop={10}
        primary
        outlined
      >
        <Block middle center>
          <Text primary bold h3 subtitle>
            {(destination && destination.description) ||
              pick_destination(locale)}
          </Text>
        </Block>
      </Button>

      <Block>
        <Button
          onPress={() => setShowTruckInfoModal(true)}
          style={styles.truckInfoButton}
          outlined
        >
          <Block row center middle>
            <MaterialCommunityIcons
              name="truck"
              color={COLORS.primary}
              size={30}
            />
            <Text marginLeft={10} primary bold subtitle>
              {edit_truck_info(locale)}
            </Text>
          </Block>
        </Button>
      </Block>

      <Block row>
        <Block center middle flex={0}>
          <Text>{departure(locale)}:</Text>
        </Block>
        <Button
          flex={1}
          marginLeft={5}
          onPress={() => {
            setShowDepartureDatePicker({
              ...showDepartureDatePicker,
              visible: true
            });
          }}
          marginTop={10}
          primary
          style={{
            height: 35
          }}
          outlined
        >
          <Block middle center>
            <Text primary bold h3 subtitle>
              {moment(showDepartureDatePicker.date).format("DD-MM-YYYY") ===
              "Invalid date"
                ? "CHOOSE DEPARTURE DATE"
                : moment(showDepartureDatePicker.date).format("DD-MM-YYYY")}
            </Text>
          </Block>
        </Button>
      </Block>

      <Button
        onPress={() => {
          createTransportRequest();
        }}
        marginTop={10}
        primary
      >
        <Block middle center>
          <Text white bold h3>
            {create_ride(locale)}
          </Text>
        </Block>
      </Button>

      {showDepartureDatePicker.visible && (
        <DateTimePicker
          value={showDepartureDatePicker.date}
          //minimumDate={todaysDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, date) => {
            if (date) {
              setShowDepartureDatePicker({
                visible: false,
                date: date
              });
            }
            console.tron.log(event, date);
          }}
        />
      )}

      {showTruckInfoModal && (
        <TruckInfoModal
          visible={showTruckInfoModal}
          setShowTruckInfoModal={setShowTruckInfoModal}
          capacity={capacity}
          setCapacity={setCapacity}
          licensePlate={licensePlate}
          setLicensePlate={setLicensePlate}
          truckMake={truckMake}
          setTruckMake={setTruckMake}
          isFragile={isFragile}
          setIsFragile={setIsFragile}
          isPerishable={isPerishable}
          setIsPerishable={setIsPerishable}
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  truckInfoButton: {
    height: 30,
    width: 160,
    marginTop: 10
  }
});

export default CreateRide;
