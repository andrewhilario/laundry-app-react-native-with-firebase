import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { orderPlacedAnimation } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#E7F3FF" }}>
      <Pressable
        onPress={() => navigation.goBack()}
        className="p-5 flex-row items-center"
      >
        <Ionicons name="arrow-back-outline" size={24} color="teal" />
        <Text className="ml-3 text-lg font-normal text-teal-600">Back</Text>
      </Pressable>
      <View className="m-auto">
        <Image
          source={{ uri: orderPlacedAnimation }}
          style={{ width: 300, height: 300 }}
        />
        <Text className="text-teal-600 text-center text-xl font-semibold mt-3">
          Your order has been placed
        </Text>
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
