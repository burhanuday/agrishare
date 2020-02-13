import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, AsyncStorage } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Block, Text } from "../../components/index";
import NavigationItem from "./NavigationItem/NavigationItem";
import * as Localization from "expo-localization";
import {
  book_transport,
  my_created_rides,
  app_title,
  see_booked_transport
} from "../../helpers/languageHelper";

const Home = props => {
  const [locale, setLocale] = useState("en");
  const [userType, setUserType] = useState("");
  console.log("locale", locale);

  useEffect(() => {
    const getUserType = async () => {
      const userType = await AsyncStorage.getItem("userType");
      setUserType(userType);
    };
    getUserType();
  });

  useEffect(() => {
    const setDefaultLanguage = async () => {
      const loc = await AsyncStorage.getItem("locale");
      setLocale(loc);
    };

    setDefaultLanguage();
  });

  return (
    <Block safe white>
      <Block row flex={0} paddingLeft={15} space="between" paddingRight={10}>
        <Block>
          <Text size={34} black bold>
            {app_title(locale)}
          </Text>
        </Block>

        <Block flex={0}>
          <TouchableWithoutFeedback
            onPress={() => {
              AsyncStorage.setItem("locale", locale === "en" ? "hi" : "en");
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
            title={book_transport(locale)}
            onPress={() => {
              props.navigation.push("BookTransport");
            }}
          />

          {userType === "farmer" ? (
            <NavigationItem
              icon="truck-delivery"
              title={see_booked_transport(locale)}
              onPress={() => {
                props.navigation.push("SeeBookedTransport");
              }}
            />
          ) : (
            <NavigationItem
              icon="steering"
              title={my_created_rides(locale)}
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
