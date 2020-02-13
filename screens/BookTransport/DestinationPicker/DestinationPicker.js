import React from "react";
import { Block, Text, Button } from "../../../components/index";
import PlacesAutoComplete from "../PlacesAutoComplete/PlacesAutoComplete";
import { FlatList, TouchableNativeFeedback } from "react-native";
import { data } from "./data";

const DestinationPicker = props => {
  const setDestination = props.navigation.getParam("setDestination", null);
  const product = props.navigation.getParam("product", null);
  console.log(product, "from dest pick");

  return (
    <Block>
      {console.tron.log("setDestination", setDestination)}
      {/*  <PlacesAutoComplete onChange={setDestination} /> */}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const prods = item.products.join(", ");
          if (product) {
            if (item.products.includes(product)) {
              return (
                <TouchableNativeFeedback
                  onPress={() => {
                    //console.log("clicked", item.description, item.geometry);
                    setDestination(item);
                  }}
                >
                  <Block
                    id={item.description}
                    white
                    marginTop={2}
                    marginHorizontal={10}
                    marginBottom={5}
                    padding={15}
                  >
                    <Text bold primary>
                      {item.description}
                    </Text>
                    <Text subtitle gray>
                      {prods}
                    </Text>
                  </Block>
                </TouchableNativeFeedback>
              );
            } else {
              return null;
            }
          } else {
            return (
              <TouchableNativeFeedback
                onPress={() => {
                  //console.log("clicked", item.description, item.geometry);
                  setDestination(item);
                }}
              >
                <Block
                  id={item.description}
                  white
                  marginTop={2}
                  marginHorizontal={10}
                  marginBottom={5}
                  padding={15}
                >
                  <Text bold primary>
                    {item.description}
                  </Text>
                  <Text subtitle gray>
                    {prods}
                  </Text>
                </Block>
              </TouchableNativeFeedback>
            );
          }
        }}
        keyExtractor={item => item.description}
      />
    </Block>
  );
};

export default DestinationPicker;
