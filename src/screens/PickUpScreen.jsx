import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Moment } from "moment-jalaali";

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState([]);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days"
    },
    {
      id: "1",
      name: "3-4 Days"
    },
    {
      id: "2",
      name: "4-5 Days"
    },
    {
      id: "3",
      name: "5-6 Days"
    },
    {
      id: "4",
      name: "Tommorrow"
    }
  ];

  const times = [
    {
      id: "0",
      time: "11:00 AM"
    },
    {
      id: "1",
      time: "12:00 NN"
    },
    {
      id: "2",
      time: "1:00 PM"
    },
    {
      id: "2",
      time: "2:00 PM"
    },
    {
      id: "4",
      time: "3:00 PM"
    },
    {
      id: "5",
      time: "4:00 PM"
    }
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
    console.log(selectedDate);
    if (!selectedDate || !selectedTime || !selectedDeliveryDate) {
      Alert.alert("Empty Fields", "Please fill all the fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { cancelable: false }
      ]);
    }
    if (selectedDate && selectedTime && selectedDeliveryDate) {
      navigation.replace("Cart", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: selectedDeliveryDate
      });
    }
  };
  return (
    <>
      <View>
        <Text className="text-lg font-medium mx-3">Pick Up Address</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          className="px-5 border-gray-400 border-[1px] rounded-lg m-3"
        />
        <Text className="text-lg font-medium mx-3 mb-2">Pick Up Date</Text>

        {/* Date Picker */}
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-06-26")}
          endDate={new Date("2023-06-31")}
          initialSelectedDate={selectedDate}
          onSelectedDateChange={(date) => setSelectedDate(date.toDateString())}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text className="text-lg font-medium mx-4 mt-7">Pick Up Time</Text>

        {/* Time Picker */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              onPress={() => setSelectedTime(item.time)}
              key={index}
              className={
                selectedTime.includes(item.time)
                  ? "border-red-400 border-[2px] px-4 py-3 items-center rounded-lg mx-3 my-2"
                  : "border-gray-400 border-[2px] px-4 py-3 items-center rounded-lg mx-3 my-2"
              }
            >
              <Text className="font-medium">{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text className="text-lg font-medium mx-4 mt-7">Delivery Date</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, index) => (
            <Pressable
              onPress={() => setSelectedDeliveryDate(item.name)}
              key={index}
              className={
                selectedDeliveryDate.includes(item.name)
                  ? "border-red-400 border-[2px] px-4 py-3 items-center rounded-lg mx-3 my-2"
                  : "border-gray-400 border-[2px] px-4 py-3 items-center rounded-lg mx-3 my-2"
              }
            >
              <Text className="font-medium">{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {total === 0 ? null : (
        <Pressable className="bg-teal-600 text-white p-4 mb-[30] m-[15] mt-auto rounded-md flex-row items-center justify-between">
          <View>
            <Text className="text-white text-[17px] font-medium">
              {cart.length} items | ${total}
            </Text>
            <Text className="text-white text-[13px] font-normal">
              Extra charges might apply
            </Text>
          </View>
          <Pressable onPress={proceedToCart}>
            <Text className="text-[17px] font-semibold text-white">
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
