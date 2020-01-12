import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Block, Text, Input, Button, Card } from "../../components/index";

const Auth = props => {
  const [phone, setPhone] = useState("");

  return (
    <Block white safe space="between">
      <Block row middle center flex={0}>
        <Text size={44} black bold>
          Truck
        </Text>
        <Text size={44} black light>
          ily
        </Text>
      </Block>
      <Block paddingHorizontal={20} flex={0.5}>
        <Card flex={1} padding={30} shadow elevation={10}>
          <Block>
            <Text bold size={32}>
              Login
            </Text>
            <Text bold marginTop={18}>
              Phone:
            </Text>
            <Input
              marginTop={15}
              onChangeText={val => setPhone(val)}
              value={phone}
              placeholder="Enter phone number"
              textContentType="telephoneNumber"
              autoCompleteType="tel"
              keyboardType="phone-pad"
            />
            <Text color="#b2b2b2" marginTop={18} caption>
              A 10 digit OTP will be sent via SMS to verify your mobile number
            </Text>
          </Block>
        </Card>
      </Block>

      <Block flex={0} center paddingBottom={20}>
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
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: 200,
    borderRadius: 30
  }
});

Auth.navigationOptions = {
  title: ""
};

export default Auth;
