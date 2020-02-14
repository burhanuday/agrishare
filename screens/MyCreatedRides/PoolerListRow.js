import React, { useState, useEffect } from "react";
import { StyleSheet, Linking } from "react-native";
import { Block, Text, Card, Button, COLORS } from "../../components";
import Axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PoolerListRow = props => {
  const [cost, setCost] = useState(0);

  const getUserDistance = async (start, end) => {
    const result = await Axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&key=AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ`
    );
    let totalDistance = 0;
    let totalDuration = 0;
    //console.tron.log("be legs");

    const legs = result.data.routes[0].legs;
    //console.tron.log(result);

    //console.tron.log("legs", legs);

    for (var i = 0; i < legs.length; ++i) {
      totalDistance += legs[i].distance.value;
      totalDuration += legs[i].duration.value;
    }
    console.log("total dist", totalDistance);
    //console.tron.log("duration", totalDistance, totalDuration);
    //return { totalDistance, totalDuration };
    totalDistance = (Number(totalDistance) / 1000) * 5;
    totalDistance = totalDistance.toString().split(".")[0];
    setCost(totalDistance);
  };

  useEffect(() => {
    getUserDistance(props.request.requestId.start, props.request.requestId.end);
  });

  return (
    <Card key={props.request._id} marginTop={7} outlined>
      <Block row middle center>
        {console.tron.log("person data", props.request)}
        <Block>
          <Block>
            <Text black bold size={18}>
              {props.request.requestId.userId.name}
            </Text>
          </Block>
          <Block>
            <Text gray>Capacity: {props.request.capacityRequired}</Text>
          </Block>
          <Block>
            <Text gray>Cost: ₹{cost}</Text>
          </Block>
        </Block>
        <Block center>
          <Button
            onPress={() => {
              Linking.openURL(`tel:${props.request.requestId.userId.phone}`);
            }}
            outlined
            style={styles.callButton}
          >
            <Block middle center row>
              <MaterialCommunityIcons
                name="phone"
                color={COLORS.primary}
                size={20}
              />
              <Text subtitle primary>
                CALL PHONE
              </Text>
            </Block>
          </Button>
        </Block>
      </Block>
    </Card>
  );
};

const styles = StyleSheet.create({
  callButton: {
    width: 120,
    height: 30
  }
});

export default PoolerListRow;
