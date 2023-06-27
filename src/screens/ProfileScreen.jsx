import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { defaultUserProfileImage } from "../../constants";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <View className="w-full bg-white p-5 pb-8">
        <View className="flex flex-row justify-between items-center">
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={24}
            color="teal"
          />
          <Feather name="edit-3" size={24} color="teal" />
        </View>
        <View className="flex-row items-center mt-5">
          <Image
            source={{
              uri:
                auth.currentUser.photoURL === null
                  ? defaultUserProfileImage
                  : auth.currentUser.photoURL
            }}
            className="rounded-full w-24 h-24"
          />
          <Text className="text-xl font-bold ml-2 text-teal-600">
            {auth.currentUser.email}
          </Text>
        </View>
      </View>
      <View className="mt-5 bg-white rounded-lg mx-3 p-4 items-center flex-col">
        <Text className="text-4xl font-bold text-teal-600">10</Text>
        <Text className="text-md mt-2 font-medium text-teal-600">
          My Orders
        </Text>
        <Pressable
          onPress={() => navigation.navigate("Cart")}
          className="mt-7 border-teal-800 border-[1px] w-full p-2 items-center rounded-md"
        >
          <Text className="text-sm font-medium text-teal-600">View Cart</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={signOutUser}
        className="mt-5 border-red-500 border-[1px] bg-white rounded-lg mx-3 p-4 items-center flex-col"
      >
        <Text className="text-lg font-semibold text-red-500">Logout</Text>
      </Pressable>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
