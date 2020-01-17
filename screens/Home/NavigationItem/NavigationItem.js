import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Text, COLORS } from "../../../components/index";

const NavigationItem = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Card
        outlined
        flex={0.5}
        marginHorizontal={10}
        space="between"
        padding={20}
      >
        <MaterialCommunityIcons
          name={props.icon}
          color={COLORS.primary}
          size={30}
        />
        <Text color={COLORS.gray}>{props.title || "Title placeholder"}</Text>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default NavigationItem;
