import axios from "axios";
import { AsyncStorage } from "react-native";
import NavigationService from "../NavigationService";

const instance = axios.create({
  baseURL: "https://truck-pool.herokuapp.com/api/"
  //baseURL: "http://7a54652c.ngrok.io"
});

/* 
instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  response => {
    return response;
  },
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  error => {
    console.log(error.response);
    if (error.response.status == 401) {
      let keys = ["token", "studentId", "type", "role", "teacherId"];
      AsyncStorage.multiRemove(keys, err => {
        NavigationService.navigate("Auth");
      });
    }
    return Promise.reject(error);
  }
);
*/

export default instance;
