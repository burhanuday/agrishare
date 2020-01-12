import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Block, Text } from "../../components/index";
import NavigationItem from "./NavigationItem/NavigationItem";

const Home = props => {
  return (
    <Block safe white>
      <Block flex={0} paddingLeft={15}>
        <Text size={34} black bold>
          Truckily
        </Text>
      </Block>

      <Block marginTop={20}>
        <Block row flex={0.2}>
          <NavigationItem
            icon="google-maps"
            title="Book transport"
            onPress={() => {
              props.navigation.push("BookTransport")
            }}
          />
          <NavigationItem icon="truck-delivery" title="See booked transport" />
        </Block>
      </Block>
    </Block>
  );
};

Home.navigationOptions = {
  title: "",
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => console.tron.log("Logout")}>
      <Block marginRight={10} marginTop={10}>
        <MaterialCommunityIcons name="logout-variant" color="black" size={30} />
      </Block>
    </TouchableWithoutFeedback>
  )
};

export default Home;
