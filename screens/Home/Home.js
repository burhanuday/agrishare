import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, AsyncStorage } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Block, Text } from "../../components/index";
import NavigationItem from "./NavigationItem/NavigationItem";
import * as Localization from "expo-localization";

const Home = props => {
  const [locale, setLocale] = useState("en");
  const [userType, setUserType] = useState("");
  console.log("locale", locale);

  const getLocaleLanguage = (english, hindi) => {
    return locale === "en" ? english : hindi;
  };

  useEffect(() => {
    const getUserType = async () => {
      const userType = await AsyncStorage.getItem("userType");
      setUserType(userType);
    };
    getUserType();
  });

  return (
    <Block safe white>
      <Block row flex={0} paddingLeft={15} space="between" paddingRight={10}>
        <Block>
          <Text size={34} black bold>
            {getLocaleLanguage("Truckily", "ट्रक")}
          </Text>
        </Block>

        <Block flex={0}>
          <TouchableWithoutFeedback
            onPress={() => {
              setLocale(locale === "en" ? "hi" : "en");
            }}
          >
            <Block flex={0} marginRight={10} marginTop={10}>
              <MaterialIcons name="language" color="black" size={30} />
            </Block>
          </TouchableWithoutFeedback>
        </Block>

        <Block flex={0}>
          <TouchableWithoutFeedback
            onPress={async () => {
              try {
                await AsyncStorage.multiRemove(["_id", "name", "phone"]);
              } catch (e) {
                console.tron.log("error removing logout keys", e);
              }
              props.navigation.navigate("Unauthenticated");
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
        </Block>
      </Block>

      <Block marginTop={20}>
        <Block row flex={0.2}>
          <NavigationItem
            icon="google-maps"
            title={getLocaleLanguage("Book transport", "दर्ज परिवहन")}
            onPress={() => {
              props.navigation.push("BookTransport");
            }}
          />

          {userType === "farmer" ? (
            <NavigationItem
              icon="truck-delivery"
              title={getLocaleLanguage(
                "See booked transport",
                "दर्ज परिवहन देखना"
              )}
              onPress={() => {
                props.navigation.push("SeeBookedTransport");
              }}
            />
          ) : (
            <NavigationItem
              icon="steering"
              title={getLocaleLanguage("My Created Rides", "मेरी सवारी")}
              onPress={() => {
                props.navigation.push("MyCreatedRides");
              }}
            />
          )}
        </Block>
      </Block>
    </Block>
  );
};

Home.navigationOptions = ({ navigation }) => {
  return {
    title: ""
  };
};

export default Home;
