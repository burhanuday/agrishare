import React, { useState } from "react";
import { StyleSheet, AsyncStorage, ActivityIndicator } from "react-native";
import {
  Block,
  Text,
  Input,
  Button,
  Card,
  COLORS
} from "../../components/index";
import axios from "../../axios/axios";

const Auth = props => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <Block white safe center space="between">
        <Block row middle center flex={0}>
          <Text size={44} black bold>
            Truck
          </Text>
          <Text size={44} black light>
            ily
          </Text>
        </Block>
        <Block center middle>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Block>
      </Block>
    );
  }

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
            if (phone.length !== 10) {
              alert("Enter a valid phone number");
              return;
            }
            setLoading(true);
            const formData = new FormData();
            formData.append("phone", phone);
            //formData.append("name", "Burhanuddin M U");
            axios
              .post("/login", formData)
              .then(async response => {
                console.tron.log(response);
                const data = response.data;
                await AsyncStorage.setItem("_id", data.user._id);
                await AsyncStorage.setItem("name", data.user.name);
                await AsyncStorage.setItem("phone", data.user.phone);
                setLoading(false);
                props.navigation.navigate("Authenticated");
              })
              .catch(error => console.tron.log(error));
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
