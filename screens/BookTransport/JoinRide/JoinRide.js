import React, { useState } from "react";
import { AsyncStorage, Switch } from "react-native";
import { Block, Text, Input, Button, COLORS } from "../../../components/index";
import DateTimePicker from "@react-native-community/datetimepicker";

import moment from "moment";
import axios from "../../../axios/axios";

const todaysDate = new Date();
const todaysDate2 = new Date();
todaysDate.setDate(todaysDate.getDate() + 1);
todaysDate2.setDate(todaysDate2.getDate() + 5);

const JoinRide = props => {
  const [showStartDatePicker, setShowStartDatePicker] = useState({
    visible: false,
    date: todaysDate
  });

  const [showEndDatePicker, setShowEndDatePicker] = useState({
    visible: false,
    date: todaysDate2
  });

  const [destination, setDestination] = useState(null);
  const [capacity, setCapacity] = useState(null);
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
    if (!showStartDatePicker.date) {
      errors.push("Select a departure start date");
    }
    if (!showEndDatePicker.date) {
      errors.push("Select a departure end date");
    }
    if (
      moment(showEndDatePicker.date).isBefore(moment(showStartDatePicker.date))
    ) {
      errors.push("End date cannot be before start date");
    }

    if (errors.length > 0) {
      let errorMessage = errors.join("\n");
      alert(errorMessage);
      return;
    }

    props.setLoading(true);

    const _id = await AsyncStorage.getItem("_id");
    console.tron.log("userId", _id);

    const formData = new FormData();
    formData.append("sourceLat", props.region.latitude);
    formData.append("sourceLng", props.region.longitude);
    formData.append("destLat", destination.geometry.lat);
    formData.append("destLng", destination.geometry.lng);
    formData.append("capacity", Number(capacity));
    formData.append("isPerishable", isPerishable);
    formData.append("isFragile", isFragile);
    if (isPerishable) {
      formData.append("departureStart", moment().format("YYYY-MM-DD"));
      formData.append(
        "departureEnd",
        moment()
          .add("2", "day")
          .format("YYYY-MM-DD")
      );
    } else {
      formData.append(
        "departureStart",
        moment(showStartDatePicker.date).format("YYYY-MM-DD")
      );
      formData.append(
        "departureEnd",
        moment(showEndDatePicker.date).format("YYYY-MM-DD")
      );
    }

    console.tron.log(formData);

    axios
      .post(`/request?userId=${_id}`, formData)
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
          <Text>Capacity:</Text>
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

      <Block marginTop={10} row space="around">
        <Text>Are your goods perishable?</Text>
        <Switch
          value={isPerishable}
          onValueChange={val => setIsPerishable(val)}
        />
      </Block>

      <Block marginTop={10} row space="around">
        <Text>Are your goods fragile?</Text>
        <Switch value={isFragile} onValueChange={val => setIsFragile(val)} />
      </Block>

      {!isPerishable && (
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
            style={{
              height: 35
            }}
            primary
            outlined
          >
            <Block middle center>
              <Text primary bold h3 subtitle>
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
            style={{
              height: 35
            }}
            outlined
          >
            <Block middle center>
              <Text primary bold h3 subtitle>
                {moment(showEndDatePicker.date).format("DD-MM-YYYY") ===
                "Invalid date"
                  ? "CHOOSE END"
                  : moment(showEndDatePicker.date).format("DD-MM-YYYY")}
              </Text>
            </Block>
          </Button>
        </Block>
      )}

      {isPerishable && (
        <Block center middle>
          <Text subtitle primary>
            Your journey will be scheduled for tomorrow
          </Text>
        </Block>
      )}

      <Button
        onPress={() => {
          createTransportRequest();
        }}
        marginTop={10}
        primary
      >
        <Block middle center>
          <Text white bold h3>
            SCHEDULE
          </Text>
        </Block>
      </Button>

      {console.tron.log("this is date obj", new Date())}

      {showStartDatePicker.visible && (
        <DateTimePicker
          value={showStartDatePicker.date}
          minimumDate={todaysDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, date) => {
            if (date) {
              setShowStartDatePicker({
                visible: false,
                date: date
              });
            }
            console.tron.log(event, date);
          }}
        />
      )}

      {showEndDatePicker.visible && (
        <DateTimePicker
          value={showEndDatePicker.date}
          minimumDate={todaysDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, date) => {
            if (date) {
              setShowEndDatePicker({
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

export default JoinRide;
