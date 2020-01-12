import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import Auth from "./screens/Auth/Auth";
import HomeScreen from "./screens/Home/Home";

const defaultNavigationOptions = {
  headerTitleStyle: {
    fontWeight: "bold",
    ...Platform.select({
      ios: { fontFamily: "Arial" },
      android: { fontFamily: "Roboto" }
    })
  },
  headerStyle: {
    shadowOpacity: 0,
    shadowColor: "transparent",
    shadowRadius: 0,
    shadowOffset: {
      height: 0
    },
    elevation: 0
  }
};

const AuthenticatedStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const UnauthenticatedStack = createStackNavigator(
  { Auth: Auth },
  {
    initialRouteName: "Auth",
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Unauthenticated: UnauthenticatedStack,
      Authenticated: AuthenticatedStack
    },
    {
      initialRouteName: "Unauthenticated"
    }
  )
);

export default AppContainer;
