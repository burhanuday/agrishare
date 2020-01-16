import React from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Block, Text, Input, Button } from "../../../components";

const TruckInfoModal = props => {
  return (
    <Block flex={0}>
      <Modal isVisible={props.visible}>
        <Block white marginTop={60} marginBottom={100} padding={30} radius={15}>
          <Block flex={0} marginBottom={30}>
            <Text size={28}>Truck information</Text>
          </Block>
          <Block flex={0} row center middle>
            <Block center marginRight={10}>
              <Text>Truck capacity:</Text>
            </Block>
            <Block>
              <Input
                marginTop={10}
                onChangeText={val => props.setCapacity(val)}
                value={props.capacity}
                placeholder="Enter capacity"
                keyboardType="number-pad"
                style={{
                  height: 30
                }}
              />
            </Block>
            <Block flex={0} center marginLeft={10} marginRight={10}>
              <Text subtitle gray>
                units
              </Text>
            </Block>
          </Block>

          <Block row flex={0} center middle>
            <Block flex={0} center marginRight={10}>
              <Text>Truck License Plate:</Text>
            </Block>
            <Block flex={2}>
              <Input
                marginTop={10}
                onChangeText={val => props.setLicensePlate(val)}
                value={props.licensePlate}
                placeholder="Enter license plate"
                style={{
                  height: 30
                }}
              />
            </Block>
          </Block>

          <Block row flex={0} center middle>
            <Block flex={0} center marginRight={10}>
              <Text>Truck Make:</Text>
            </Block>
            <Block flex={2}>
              <Input
                marginTop={10}
                onChangeText={val => props.setTruckMake(val)}
                value={props.truckMake}
                placeholder="Enter Truck Make"
                style={{
                  height: 30
                }}
              />
            </Block>
          </Block>

          <Block right style={styles.okayButtonStyle}>
            <Button onPress={() => props.setShowTruckInfoModal(false)} primary>
              <Block center middle>
                <Text bold white>
                  OK
                </Text>
              </Block>
            </Button>
          </Block>
        </Block>
      </Modal>
    </Block>
  );
};

const styles = StyleSheet.create({
  okayButtonStyle: {
    height: 20,
    width: 70
  }
});

export default TruckInfoModal;
