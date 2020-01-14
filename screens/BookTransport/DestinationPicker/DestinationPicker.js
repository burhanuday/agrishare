import React from "react";
import { Block, Text } from "../../../components/index";
import PlacesAutoComplete from "../PlacesAutoComplete/PlacesAutoComplete";

const DestinationPicker = props => {
  const setDestination = props.navigation.getParam("setDestination", null);

  return (
    <Block>
      {console.tron.log("setDestination", setDestination)}
      <PlacesAutoComplete onChange={setDestination} />
    </Block>
  );
};

export default DestinationPicker;
