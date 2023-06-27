import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity
} from "../../CartReducer";
import { decrementQty, incrementQty } from "../../ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const userId = auth.currentUser.uid;

  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userId}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params
      },
      { merge: true }
    );
  };
  return (
    <>
      <ScrollView>
        {total === 0 ? (
          <View className="justify-center items-center bg-white h-screen">
            <Image
              className="w-[300px] h-[300px] object-contain"
              source={require("../../assets/images/emptyCart.png")}
            />
            <Text className="mt-10 text-2xl text-gray-400">
              Your cart is Empty
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Home")}
              className="py-2 rounded-md border-teal-600 mt-5 "
            >
              <Text className="text-teal-600 text-lg font-normal underline">
                Go back
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View className="p-3 flex-row items-center">
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text className="ml-2 text-[16px]">Your Bucket</Text>
            </View>
            <Pressable className="mx-4 rounded-lg bg-white p-3  ">
              {cart.map((item, index) => (
                <View
                  className="flex-row items-center justify-between my-3"
                  key={index}
                >
                  <Text className="w-[100px] text-[16px] font-medium capitalize">
                    {item.name}
                  </Text>

                  {/*  - + button */}
                  <Pressable className="flex-row px-[2] py-1 items-center border-gray-400 border-[1px] rounded-lg">
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // Cart
                        dispatch(decrementQty(item)); // Product
                      }}
                    >
                      <Text className="text-[20px] font-semibold text-[#088f8f] px-[6] text-center">
                        -
                      </Text>
                    </Pressable>
                    <Pressable>
                      <Text className="font-semibold text-[#088f8f] px-[8] text-[19px]">
                        {item.quantity}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // Cart
                        dispatch(incrementQty(item)); // Product
                      }}
                    >
                      <Text className="text-[20px] font-semibold text-[#088f8f] px-[6] text-center">
                        +
                      </Text>
                    </Pressable>
                  </Pressable>

                  <Text className="text-[16px] font-medium capitalize">
                    ${item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>
            <View className="mx-4">
              <Text className="text-base font-bold mt-3">Billing Details</Text>
              <View className="bg-white rounded-lg p-4 mt-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-normal text-gray-400">
                    Item Total
                  </Text>
                  <Text className="text-base font-normal">${total}</Text>
                </View>
                <View className="flex-row items-center justify-between mt-5">
                  <Text className="text-base font-normal text-gray-400">
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text className="text-base font-normal text-[#088F8F]">
                    FREE
                  </Text>
                </View>
                <View className="flex-row items-center mt-5">
                  <Text className="text-base font-medium text-gray-400">
                    Free Delivery on Your order
                  </Text>
                </View>
                <View className="border-gray-500 h-[1] border-[0.5px] mt-5" />
                <View className="flex-row items-center justify-between mt-6">
                  <Text className="text-base font-medium text-gray-400">
                    Selected Date
                  </Text>
                  <Text className="text-base font-normal text-[#088fbf]">
                    {route.params.pickUpDate}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mt-6">
                  <Text className="text-base font-medium text-gray-400">
                    No. of Days
                  </Text>
                  <Text className="text-base font-normal text-[#088fbf]">
                    {route.params.no_Of_days}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mt-6">
                  <Text className="text-base font-medium text-gray-400">
                    Selected Pick Up Time
                  </Text>
                  <Text className="text-base font-normal text-[#088fbf]">
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View className="border-gray-500 h-[1] border-[0.5px] mt-5" />
                <View className="flex-row items-center justify-between mt-6">
                  <Text className="text-lg font-bold">To Pay</Text>
                  <Text className="text-lg font-bold">${total}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

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
          <Pressable onPress={placeOrder}>
            <Text className="text-[17px] font-semibold text-white">
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;
