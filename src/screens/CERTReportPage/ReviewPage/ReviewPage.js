import { useAtomValue } from "jotai";
import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

import LineSeparator from "../../../components/LineSeparator/LineSeparator";
import ReportHeader from "../../../components/ReportHeader/ReportHeader";
import Theme from "../../../utils/Theme";
import {
  visitNumbers,
  RoadCondition,
  StructureType,
  StructureCondition,
  HazzardFire,
  HazzardPropane,
  HazzardWater,
  HazzardElectrical,
  HazzardChemical,
} from "../../../utils/constants/dropdownOptions";
import { formatDate } from "../../../utils/formatDate/formatDate";
import { certReportAtom } from "../CERTPageAtoms";
import NavigationButtons from "../components/NavigationButtons";

const ReviewPage = () => {
  const certReport = useAtomValue(certReportAtom);

  const getLabelFromList = (value, list) => {
    const item = list.find((item) => item.value === value);
    return item ? item.label : value;
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <ReportHeader
        title="CERT Reporting"
        subtitle="Review entry before saving"
      />
      <LineSeparator />
      <View style={{ marginBottom: 10 }} />

      <ScrollView>
        <Text style={styles.boldText}>Info:</Text>
        <View style={styles.box}>
          <Text>{`Start Time: ${formatDate(certReport.info.startTime)}`}</Text>
          <Text>{`CERT Group Name: ${certReport.info.groupName}`}</Text>
          <Text>{`CERT Squad Name: ${certReport.info.squadName}`}</Text>
        </View>

        <Text style={styles.boldText}>Location:</Text>
        <View style={styles.box}>
          <Text>{`GPS: ${certReport.location.latitude}, ${certReport.info.longitude}`}</Text>
          <Text>{`Accuracy: ${certReport.location.accuracy} meters`}</Text>
          <Text>{`Visit Number: ${getLabelFromList(
            certReport.location.numberOfVisit,
            visitNumbers,
          )}`}</Text>
          <Text>{`Road Access: ${getLabelFromList(
            certReport.location.roadCondition,
            RoadCondition,
          )}`}</Text>
          <Text>{`Location Address: ${certReport.location.address}`}</Text>
        </View>

        <Text style={styles.boldText}>Hazards:</Text>
        <View style={styles.box}>
          <Text>{`Structure Type: ${getLabelFromList(
            certReport.hazard.structureType,
            StructureType,
          )}`}</Text>
          <Text>{`Structure Condition: ${getLabelFromList(
            certReport.hazard.structureCondition,
            StructureCondition,
          )}`}</Text>
          <Text>{`Fire Hazards: ${getLabelFromList(
            certReport.hazard.hazardFire,
            HazzardFire,
          )}`}</Text>
          <Text>{`Propane or Gas Hazards: ${getLabelFromList(
            certReport.hazard.hazardPropane,
            HazzardPropane,
          )}`}</Text>
          <Text>{`Water Hazards: ${getLabelFromList(
            certReport.hazard.hazardWater,
            HazzardWater,
          )}`}</Text>
          <Text>{`Electrical Hazards: ${getLabelFromList(
            certReport.hazard.hazardElectrical,
            HazzardElectrical,
          )}`}</Text>
          <Text>{`Chemical Hazards: ${getLabelFromList(
            certReport.hazard.hazardChemical,
            HazzardChemical,
          )}`}</Text>
        </View>

        <Text style={styles.boldText}>Personnel:</Text>
        <View style={styles.box}>
          <Text>{`Rescued People Green: ${certReport.people.greenPersonal}`}</Text>
          <Text>{`Rescued People Yellow: ${certReport.people.yellowPersonal}`}</Text>
          <Text>{`Rescued People Red: ${certReport.people.redPersonal}`}</Text>
          <Text>{`People Trapped: ${certReport.people.trappedPersonal}`}</Text>
          <Text>{`People Need Shelter: ${certReport.people.personalRequiringShelter}`}</Text>
          <Text>{`Deceased People: ${certReport.people.deceasedPersonal}`}</Text>
          <Text>{`Deceased People Location: ${certReport.people.deceasedPersonalLocation}`}</Text>
          <Text>{`Refugees needing First Aid: ${certReport.people.refugeesFirstAid}`}</Text>
          <Text>{`Refugees needing Shelter: ${certReport.people.refugeesShelter}`}</Text>
        </View>

        <Text style={styles.boldText}>Notes:</Text>
        <View style={styles.box}>
          <Text>{`Notes: ${certReport.note.NotesTextArea}`}</Text>
          {certReport.certPicture.number > 0 && (
            <Text>{`Picture: ${
              certReport.info.hash +
              "_" +
              certReport.certPicture.number +
              ".jpeg"
            }`}</Text>
          )}
          <Text>{`Finish Time: ${formatDate(certReport.info.endTime)}`}</Text>
        </View>
        <NavigationButtons />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: Theme.COLORS.BORDER_COLOR,
    padding: 10,
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: Theme.RADIUS.DEFAULT,
  },
  boldText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ReviewPage;
