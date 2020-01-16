import React, { useState, useEffect } from "react";
import { StyleSheet, Linking } from "react-native";
import { Block, Text, Card, Button, COLORS } from "../../components";
import Axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TransportListRow = props => {
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [driver, setDriver] = useState({});
  const [vehicle, setVehicle] = useState({});

  const fetchData = async () => {
    console.tron.log("req", props.request);
    const journey = props.request.item.journeyId;
    //console.tron.log("jour", journey);
    const start = journey.start;
    const end = journey.end;
    const waypoints = journey.waypoints;
    const driver = journey.posted_by;
    const vehicle = journey.vehicle;

    try {
      const responseStart = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${start.lat},${start.lng}&key=AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ`
      );
      const startAddress = responseStart.data.results[2].formatted_address;
      //console.tron.log("result", startAddress.formatted_address);

      const responseEnd = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${end.lat},${end.lng}&key=AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ`
      );
      const endAddress = responseEnd.data.results[2].formatted_address;
      //console.tron.log("result", endAddress.formatted_address);

      setStartAddress({ address: startAddress, geometry: start });
      setEndAddress({ address: endAddress, geometry: end });
      setWaypoints(waypoints);
      setDriver(driver);
      setVehicle(vehicle);
    } catch (error) {
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
      `https://www.google.com/maps/dir/?api=1&origin=${startAddress.geometry.lat},${startAddress.geometry.lng}&destination=${endAddress.geometry.lat},${endAddress.geometry.lng}&waypoints=${waypointsString}`
    );
  };

  useEffect(() => {
    fetchData().then(res => console.log(res));
  }, [props]);

  return (
    <Card margin={5} outlined>
      <Block style={styles.container} padding={5}>
        <Block row>
          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              DRIVER NAME
            </Text>
            <Text>{driver.name}</Text>
          </Block>
          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              DRIVER PHONE
            </Text>
            <Text>{driver.phone}</Text>
          </Block>
          <Block paddingLeft={5} paddingRight={5} flex={1}>
            <Text primary small>
              TRUCK TYPE
            </Text>
            <Text>{vehicle.type}</Text>
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

        <Block paddingLeft={5} paddingRight={5} flex={1}>
          <Text primary small>
            DESTINATION
          </Text>
          <Text>{endAddress.address}</Text>
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

export default TransportListRow;
