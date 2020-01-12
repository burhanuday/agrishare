import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Block, Text, Input, Button } from "../../components/index";

const Auth = props => {
  const [phone, setPhone] = useState("");

  return (
    <Block padding={20} safe middle>
      <Block middle flex={0.1}>
        <Text>Phone:</Text>
        <Input
          marginTop={15}
          onChangeText={val => setPhone(val)}
          value={phone}
          placeholder="Enter phone number"
          textContentType="telephoneNumber"
          autoCompleteType="tel"
          keyboardType="phone-pad"
        />
        <Block center marginTop={10}>
          <Button
            onPress={() => {
              props.navigation.navigate("Authenticated");
            }}
            style={styles.loginButton}
            primary
          >
            <Block center middle>
              <Text white bold>
                LOGIN
              </Text>
            </Block>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: 100
  }
});

Auth.navigationOptions = {
  headerShown: false
};

export default Auth;
