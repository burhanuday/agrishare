import React, { useEffect, useState } from "react";
import { AsyncStorage, FlatList, Platform, RefreshControl } from "react-native";
import { Block, Text, Card } from "../../components/index";
import axios from "../../axios/axios";
import TransportListRow from "./TransportListRow";

const SeeBookedTransport = props => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBookedRequests = async () => {
    setLoading(true);
    try {
      const _id = await AsyncStorage.getItem("_id");
      //console.tron.log("_id", _id);
      const response = await axios.get(`/requests?userId=${_id}`);
      console.tron.log(response.data);
      if (Number(response.data.error) === 0) {
        const requests = response.data.requests;
        setRequests(requests);
      }
      setLoading(false);
      return response;
    } catch (e) {
      setLoading(false);
      alert("There was an error");
    }
  };

  const onRefresh = React.useCallback(() => {
    getBookedRequests().then(res => {
      //console.tron.log(res);
    });
  }, [getBookedRequests]);

  useEffect(() => {
    getBookedRequests().then(res => {
      //console.tron.log(res);
    });
  }, []);

  return (
    <Block safe>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <Card>
            <Block middle center>
              <Text>No journeys...</Text>
            </Block>
          </Card>
        )}
        data={requests}
        renderItem={request => <TransportListRow request={request} />}
        keyExtractor={item => item._id}
      />
    </Block>
  );
};

SeeBookedTransport.navigationOptions = {
  title: "See Booked Transport"
};

export default SeeBookedTransport;
