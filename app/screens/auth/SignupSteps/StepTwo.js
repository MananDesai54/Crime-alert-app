import { Ionicons } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import { View } from "react-native";
import { colors } from "../../../colors";
import Input from "../../../components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const StepOne = (props) => {
  const [showDateDialogue, setShowDateDialogue] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <Fragment>
      {showDateDialogue && (
        <DateTimePicker
          testID="DOB"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(_, date) => {
            setDate(date);
            setShowDateDialogue(false);
            props.setFieldValue("DOB", date);
          }}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          width: 300,
          maxWidth: "90%",
        }}
      >
        <Input value={moment(date).format("Do MMMM YYYY")} name="DOB" />
        <Ionicons
          name="ios-calendar"
          color={colors.textPrimary}
          size={30}
          onPress={() => setShowDateDialogue(true)}
          style={{ position: "absolute", right: 0 }}
        />
      </View>
      <Input
        value={props.values.mobileNumber}
        handleChange={props.handleChange("mobileNumber")}
        name="mobileNumber"
        config={{ keyboardType: "number-pad" }}
      />
      <Input
        value={props.values.address}
        handleChange={props.handleChange("address")}
        name="address"
      />
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          width: 300,
        }}
      >
        <Ionicons
          name="ios-arrow-back-circle"
          color={colors.backgroundSecondary}
          size={54}
          onPress={props.previousStep}
        />
        <Ionicons
          name="ios-arrow-forward-circle"
          color={colors.backgroundSecondary}
          size={54}
          onPress={props.nextStep}
        />
      </View>
    </Fragment>
  );
};

export default StepOne;
