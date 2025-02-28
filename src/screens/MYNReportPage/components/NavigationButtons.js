import { useNavigation } from "@react-navigation/native";
import { useAtom, useAtomValue } from "jotai/index";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { imagesAtom } from "../../../components/EverythingCamera/ImagesAtom";
import { saveImages } from "../../../components/EverythingCamera/components/saveImage/saveImage";
import { addReport } from "../../../utils/Database/OfflineSQLiteDB";
import Theme from "../../../utils/Theme";
import { mynReportAtom, mynTabsStatusAtom } from "../MYNPageAtoms";

const Button = ({ title, onPress, buttonStyle }) => (
  <TouchableOpacity style={buttonStyle} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const NavigationButtons = ({ validateData }) => {
  const [mynTabsStatus, setMynTabsStatus] = useAtom(mynTabsStatusAtom);
  const mynReport = useAtomValue(mynReportAtom);
  const navigation = useNavigation();
  const images = useAtomValue(imagesAtom);

  const handleCancelPress = () => {
    navigation.navigate("MainScreen");
  };

  const handleBackToReportPage = () => {
    navigation.navigate("MYN Report Page");
    const currentTabIndex = mynTabsStatus.tabIndex;
    setMynTabsStatus({ ...mynTabsStatus, tabIndex: currentTabIndex - 1 });
  };

  const handleGoToReviewPage = () => {
    navigation.navigate("MYN Review Page");
    const currentTabIndex = mynTabsStatus.tabIndex;
    setMynTabsStatus({ ...mynTabsStatus, tabIndex: currentTabIndex + 1 });
  };

  const handleBackPress = () => {
    const currentTabIndex = mynTabsStatus.tabIndex;
    setMynTabsStatus({ ...mynTabsStatus, tabIndex: currentTabIndex - 1 });
  };

  const handleNextPress = () => {
    validateData();
  };

  const handleSavePress = () => {
    addReport("MYN", mynReport);
    let fileName = "ReadyNeighborCustomName";
    if (mynReport.info.hash !== 0 && mynReport.info.hash !== null) {
      fileName = mynReport.info.hash;
    }
    if (Array.isArray(images) && images.length > 0) {
      saveImages(images, fileName).then((r) => console.log("saved", r));
    }
    navigation.navigate("MainScreen");
  };

  let leftButton;
  let rightButton;

  if (mynTabsStatus.tabIndex === 0) {
    leftButton = (
      <Button
        title="Cancel"
        onPress={handleCancelPress}
        buttonStyle={styles.cancelButton}
      />
    );
  } else if (mynTabsStatus.tabIndex === 6) {
    leftButton = (
      <Button
        title="Edit"
        onPress={handleBackToReportPage}
        buttonStyle={styles.cancelButton}
      />
    );
  } else {
    leftButton = (
      <Button
        title="Back"
        onPress={handleBackPress}
        buttonStyle={styles.cancelButton}
      />
    );
  }

  if (mynTabsStatus.tabIndex === 5) {
    rightButton = (
      <Button
        title="Review"
        onPress={handleGoToReviewPage}
        buttonStyle={styles.button}
      />
    );
  } else if (mynTabsStatus.tabIndex === 6) {
    rightButton = (
      <Button
        title="Save"
        onPress={handleSavePress}
        buttonStyle={styles.button}
      />
    );
  } else {
    rightButton = (
      <Button
        title="Next"
        onPress={handleNextPress}
        buttonStyle={styles.button}
      />
    );
  }

  return (
    <View style={styles.container}>
      {leftButton}
      {rightButton}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  cancelButton: {
    padding: Theme.BUTTON_PADDING.VERTICAL,
    alignItems: "center",
    width: "48%",
    borderColor: Theme.COLORS.BACKGROUND_YELLOW,
    borderWidth: 1,
    paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
    borderRadius: Theme.RADIUS.BUTTON,
  },
  button: {
    padding: Theme.BUTTON_PADDING.VERTICAL,
    alignItems: "center",
    width: "48%",
    backgroundColor: Theme.COLORS.BACKGROUND_YELLOW,
    paddingVertical: Theme.BUTTON_PADDING.VERTICAL,
    borderRadius: Theme.RADIUS.BUTTON,
  },
  text: {
    color: Theme.COLORS.TEXT_BLACK,
  },
};

export default NavigationButtons;
