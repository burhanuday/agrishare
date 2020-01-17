import React, { useEffect, useState } from "react";
import { AsyncStorage, FlatList, RefreshControl } from "react-native";
import { Block, Text, Card } from "../../components/index";
import axios from "../../axios/axios";
import JourneyListRow from "./JourneyListRow";

const MyCreatedRides = props => {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJourneys = async () => {
    setLoading(true);
    try {
      const _id = await AsyncStorage.getItem("_id");
      //console.tron.log("_id", _id);
      const response = await axios.get(`/journeys?userId=${_id}`);
      console.log("response from api", response.data);
      if (Number(response.data.error) === 0) {
        const journeys = response.data.journeys;
        setJourneys(journeys);
      }
      setLoading(false);
      return response;
    } catch (e) {
      setLoading(false);
      alert("There was an error");
    }
  };

  const onRefresh = React.useCallback(() => {
    fetchJourneys().then(res => {
      //console.tron.log(res);
    });
  }, [fetchJourneys]);

  useEffect(() => {
    fetchJourneys().then(res => {});
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
              <Text>No Rides...</Text>
            </Block>
          </Card>
        )}
        data={journeys}
        renderItem={journey => <JourneyListRow journey={journey} />}
        keyExtractor={item => item._id}
      />
    </Block>
  );
};

MyCreatedRides.navigationOptions = {
  title: "My Created Rides"
};

export default MyCreatedRides;
