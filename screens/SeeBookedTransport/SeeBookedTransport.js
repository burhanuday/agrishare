import React, { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { Block, Text } from "../../components/index";
import axios from "../../axios/axios";

const SeeBookedTransport = props => {
  const [requests, setRequests] = useState([]);

  const getBookedRequests = async () => {
    const _id = await AsyncStorage.getItem("_id");
    //console.tron.log("_id", _id);
    const response = await axios.get(`/requests?userId=${_id}`);
    console.tron.log(response.data);
    if (Number(response.data.error) === 0) {
      const requests = response.data.requests;
      setRequests(requests);
    }
    return response;
  };

  useEffect(() => {
    getBookedRequests().then(res => {
      //console.tron.log(res);
    });
  }, []);

  return (
    <Block safe>
      <Text>booked transport screen</Text>
    </Block>
  );
};

SeeBookedTransport.navigationOptions = {
  title: "See Booked Transport"
};

export default SeeBookedTransport;
