import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import apisaucePlugin from "reactotron-apisauce";
import sagaPlugin from "reactotron-redux-saga";
import { AsyncStorage } from "react-native";

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: "10.10.9.109" }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .use(sagaPlugin())
  .use(apisaucePlugin());

Reactotron.connect(); // Connect with reactotron
Reactotron.clear(); // Clear the logs.

console.tron = Reactotron;

const sagaMonitor = Reactotron.createSagaMonitor();
export { sagaMonitor };
