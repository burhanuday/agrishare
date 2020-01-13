import React from "react";
import { Block, Text } from "../../components/index";

const SeeBookedTransport = props => {
  return (
    <Block safe>
      <Text>booked transport screen</Text>
    </Block>
  );
};

SeeBookedTransport.navigationOptions = {
  title: "See booked transport"
};

export default SeeBookedTransport;
