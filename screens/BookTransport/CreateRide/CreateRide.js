import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import { Block, Text, Input, Button, COLORS } from "../../../components/index";
import DateTimePicker from "@react-native-community/datetimepicker";

import moment from "moment";
import axios from "../../../axios/axios";
import Axios from "axios";

const todaysDate = new Date();
todaysDate.setDate(todaysDate.getDate() + 5);

const CreateRide = props => {
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState({
    visible: false,
    date: todaysDate
  });

  const [destination, setDestination] = useState(null);
  const [capacity, setCapacity] = useState(null);

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
        formData.append("capacityAvailable", Number(capacity));
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
      .catch(error => console.tron.log(error));
  };

  return (
    <React.Fragment>
      <Button
        flex={1}
        marginRight={5}
        onPress={() => {
          props.navigation.push("DestinationPicker", {
            setDestination: geometry => {
              setDestination(geometry);
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
            {(destination && destination.description) || "PICK DESTINATION"}
          </Text>
        </Block>
      </Button>

      <Block row>
        <Block center middle flex={0} marginRight={10}>
          <Text>Truck capacity:</Text>
        </Block>
        <Block>
          <Input
            marginTop={10}
            onChangeText={val => setCapacity(val)}
            value={capacity}
            placeholder="Enter capacity"
            keyboardType="number-pad"
            style={{
              height: 30
            }}
          />
        </Block>
        <Block flex={0} middle center marginLeft={10} marginRight={10}>
          <Text subtitle gray>
            units
          </Text>
        </Block>
      </Block>

      <Block row>
        <Block center middle flex={0}>
          <Text>Departure:</Text>
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
            CREATE RIDE
          </Text>
        </Block>
      </Button>

      {showDepartureDatePicker.visible && (
        <DateTimePicker
          value={showDepartureDatePicker.date}
          minimumDate={todaysDate}
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
    </React.Fragment>
  );
};

export default CreateRide;
