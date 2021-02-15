import { Picker } from "@react-native-picker/picker";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../colors/index";
import React, { useState, useEffect, Fragment } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAroundData } from "../store/actions/crime";
import Layout from "../components/Layout";

const PlacesScreen = (props) => {
  const cityData = useSelector((state) => state.crime.cityData);

  const [leftPriority, setLeftPriority] = useState([
    "Surat",
    "Vadodara",
    "Ahmedabad",
    "Rajkot",
    "Mumbai",
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedValue, setSelectedValue] = useState("Surat");

  const [monthData, setMonthData] = useState(Array(12).fill(0));

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      await dispatch(getAroundData({ city: selectedValue }));
      setIsLoading(() => false);
    }
    getData();
  }, [selectedValue]);

  useEffect(() => {
    const newArray = Array(12).fill(0);
    cityData.places.forEach((place) => {
      const month = new Date(place["createdAt"]).getMonth();
      newArray[month]++;
    });
    setMonthData((prev) => [...newArray]);
  }, [cityData]);

  return (
    <Layout navigation={props.navigation}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.backgroundPrimary} />
      ) : (
        <Fragment>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#fb8c00",
            }}
          >
            <View
              style={{
                height: 50,
                width: 200,
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 5,
                overflow: "hidden",
                marginBottom: 16,
                marginTop: 30,
              }}
            >
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                  setSelectedValue(() => itemValue);
                }}
                dropdownIconColor="white"
                style={{
                  color: "white",
                }}
              >
                {leftPriority.map((priority) => (
                  <Picker.Item
                    label={priority}
                    value={priority}
                    key={priority}
                  />
                ))}
              </Picker>
            </View>
            <LineChart
              data={{
                labels: [
                  "J",
                  "F",
                  "M",
                  "A",
                  "M",
                  "J",
                  "J",
                  "A",
                  "S",
                  "O",
                  "N",
                  "D",
                ],
                datasets: [
                  {
                    data: monthData,
                  },
                ],
              }}
              width={Dimensions.get("window").width}
              height={280}
              fromZero={true}
              yAxisLabel="Crime"
              yAxisInterval={"5"}
              chartConfig={{
                backgroundColor: "#fb8c00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#fb8c00",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: "8",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 18,
                alignItems: "center",
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 80,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                backgroundColor: "#f5af49",
                borderRadius: 5,
                width: 150,
                height: 100,
                marginRight: 20,
                elevation: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ marginTop: 10, color: "grey" }}>Total Cases</Text>
              <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 7 }}>
                {cityData.totalCrimes}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#f5af49",
                borderRadius: 5,
                width: 150,
                height: 100,
                elevation: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ marginTop: 10, color: "grey" }}>
                Avg case/month
              </Text>
              <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 7 }}>
                {(cityData.totalCrimes / 12).toFixed(2)}
              </Text>
            </View>
          </View>
        </Fragment>
      )}
    </Layout>
  );
};

export default PlacesScreen;
