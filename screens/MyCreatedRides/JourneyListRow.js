import React, { useState, useEffect } from "react";
import { StyleSheet, Linking } from "react-native";
import { Block, Text, Card, Button, COLORS } from "../../components";
import Axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import PoolerListRow from "./PoolerListRow";

const JourneyListRow = props => {
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const [departure, setDeparture] = useState("");
  const [duration, setDuration] = useState({
    totalDistance: 0,
    totalDuration: 0
  });
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const getDuration = async (startAddress, endAddress, waypoints) => {
    const waypointsString = waypoints.reduce((total, current) => {
      return `${total}${current.latitude},${current.longitude}|`;
    }, "");
    //console.tron.log("e req");

    //console.tron.log("way string", waypointsString);
    const result = await Axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startAddress.geometry.lat},${startAddress.geometry.lng}&destination=${endAddress.geometry.lat},${endAddress.geometry.lng}&waypoints=${waypointsString}&key=AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ`
    );
    //console.tron.log("results a sa s", result);

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
    //console.tron.log("duration", totalDistance, totalDuration);
    return { totalDistance, totalDuration };
  };

  const fetchData = async () => {
    //console.tron.log("req", props.journey);
    const journey = props.journey.item;
    //console.tron.log("journe", props.journey.item);

    //console.tron.log("jour", journey);
    const start = journey.start;
    const end = journey.end;
    const waypoints = journey.waypoints;
    const vehicle = journey.vehicle;
    const departure = journey.departure;
    const acceptedRequests = journey.accepted_requests;

    try {
      const responseStart = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${start.lat},${start.lng}&key=AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ`
      );
      const startAddress = responseStart.data.results[0].formatted_address;
      //console.tron.log("result", startAddress.formatted_address);

      const responseEnd = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${end.lat},${end.lng}&key=AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ`
      );
      //console.tron.log("dur in main fn", duration);

      const endAddress = responseEnd.data.results[0].formatted_address;
      //console.tron.log("result", endAddress.formatted_address);
      const duration = await getDuration(
        { address: startAddress, geometry: start },
        { address: endAddress, geometry: end },
        waypoints
      );

      setStartAddress({ address: startAddress, geometry: start });
      setEndAddress({ address: endAddress, geometry: end });
      setWaypoints(waypoints);
      setVehicle(vehicle);
      setDeparture(departure);
      setDuration(duration);
      setAcceptedRequests(acceptedRequests);
    } catch (error) {
      console.tron.log("error", error);

      alert("There was an error with the request");
    }
    return "done";
  };

  const handleSeeRoutePressed = () => {
    //console.tron.log("waypoints", waypoints);

    const waypointsString = waypoints.reduce((total, current) => {
      return `${total}${current.latitude},${current.longitude}|`;
    }, "");
    //console.tron.log("way string", waypointsString);

    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&origin=${startAddress.geometry.lat},${startAddress.geometry.lng}&destination=${endAddress.geometry.lat},${endAddress.geometry.lng}&waypoints=${waypointsString}&travelmode=driving`
    );
  };

  useEffect(() => {
    fetchData().then(res => {
      //console.log(res)
    });
  }, [props]);

  const getHoursFromSeconds = seconds => {
    let hours = seconds / 3600;
    hours = String(hours);
    hours = hours.substring(0, 4);
    return hours + " hrs";
  };

  const getKmsFromM = meters => {
    let distance = meters / 1000;
    distance = String(distance);
    distance = distance.substring(0, 5);
    return distance + " kms";
  };

  const getKmsFromMNumber = meters => {
    let distance = meters / 1000;
    distance = String(distance);
    distance = distance.substring(0, 5);
    return distance;
  };

  return (
    <Card margin={5} outlined>
      {
        //console.log(props.journey)
      }
      <Block style={styles.container} padding={5}>
        <Block row marginBottom={10}>
          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              TRUCK MAKE
            </Text>
            <Text>{vehicle.model}</Text>
          </Block>

          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              LICENSE PLATE
            </Text>
            <Text>{vehicle.license_plate}</Text>
          </Block>
        </Block>

        <Block row marginBottom={10}>
          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              DEPARTURE
            </Text>
            <Text>
              {moment(departure, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                "DD-MM-YYYY"
              )}
            </Text>
          </Block>

          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              DISTANCE
            </Text>
            <Text>{getKmsFromM(duration.totalDistance)}</Text>
          </Block>

          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              DURATION
            </Text>
            <Text>{getHoursFromSeconds(duration.totalDuration)}</Text>
          </Block>
        </Block>

        <Block row marginBottom={10}>
          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              TOTAL COST
            </Text>
            <Text>
              ₹
              {
                String(
                  Number(getKmsFromMNumber(duration.totalDistance)) * 14
                ).split(".")[0]
              }
            </Text>
          </Block>

          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              PERISHABLE GOODS
            </Text>
            <Text>{props.journey.item.isPerishable ? "YES" : "NO"}</Text>
          </Block>

          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              FRAGILE GOODS
            </Text>
            <Text>{props.journey.item.isFragile ? "YES" : "NO"}</Text>
          </Block>
        </Block>

        <Block paddingLeft={5} paddingRight={5} flex={1}>
          <Text primary small>
            SOURCE
          </Text>
          <Text>{startAddress.address}</Text>
        </Block>

        <Block center middle flex={0} paddingTop={10} paddingBottom={10} row>
          <Block style={styles.divider} />
          <MaterialCommunityIcons
            name="truck-delivery"
            color={COLORS.primary}
            size={30}
          />
          <Block style={styles.divider} />
        </Block>

        <Block marginBottom={10} paddingLeft={5} paddingRight={5} flex={1}>
          <Text primary small>
            DESTINATION
          </Text>
          <Text>{endAddress.address}</Text>
        </Block>

        <Block marginTop={10} paddingLeft={5} paddingRight={5} flex={1}>
          <Text primary small>
            POOLERS
          </Text>
          {acceptedRequests.map(request => {
            return <PoolerListRow request={request} />;
          })}
        </Block>
      </Block>

      <Block middle row right marginTop={10}>
        <Button onPress={handleSeeRoutePressed} outlined style={styles.button}>
          <Block middle center row>
            <Text subtitle primary>
              SEE ROUTE
            </Text>
            <MaterialCommunityIcons
              name="arrow-right"
              color={COLORS.primary}
              size={20}
            />
          </Block>
        </Button>
      </Block>
    </Card>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    width: 120,
    height: 30
  },
  container: {
    justifyContent: "space-between"
  }
});

export default JourneyListRow;
