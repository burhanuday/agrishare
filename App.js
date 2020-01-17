import React from "react";
import { Provider } from "react-redux";
import AppContainer from "./routes";
import NavigationService from "./NavigationService";
import store from "./store/store";

if (__DEV__) {
  // eslint-disable-next-line
  import("./reactotron-config").then(() =>
    console.tron.log("Reactotron Configured")
  );
}

export default function App() {
  const setLocale = locale => {
    //setState({ locale });
  };
  return (
    <Provider store={store}>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
}
