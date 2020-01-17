import React from "react";
import { TouchableWithoutFeedback, AsyncStorage } from "react-native";
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
              props.navigation.push("BookTransport");
            }}
          />
          <NavigationItem
            icon="truck-delivery"
            title="See booked transport"
            onPress={() => {
              props.navigation.push("SeeBookedTransport");
            }}
          />
        </Block>
        <Block marginTop={10} row flex={0.2}>
          <Block row flex={0.83}>
            <NavigationItem
              icon="google-maps"
              title="My Created Rides"
              onPress={() => {
                props.navigation.push("MyCreatedRides");
              }}
            />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

Home.navigationOptions = ({ navigation }) => {
  return {
    title: "",
    headerRight: () => (
      <TouchableWithoutFeedback
        onPress={async () => {
          try {
            await AsyncStorage.multiRemove(["_id", "name", "phone"]);
          } catch (e) {
            console.tron.log("error removing logout keys", e);
          }
          navigation.navigate("Unauthenticated");
        }}
      >
        <Block marginRight={10} marginTop={10}>
          <MaterialCommunityIcons
            name="logout-variant"
            color="black"
            size={30}
          />
        </Block>
      </TouchableWithoutFeedback>
    )
  };
};

export default Home;
