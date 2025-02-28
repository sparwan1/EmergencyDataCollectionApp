import React from "react";
import { View, StyleSheet, Modal } from "react-native";

import CustomSpinner from "../CustomSpinner/CustomSpinner";

const LoadingScreen = ({ isVisible }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      testID="loading-screen-modal"
    >
      <View style={styles.container} testID="loading-screen-container">
        <CustomSpinner text="Loading" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
});

export default LoadingScreen;
