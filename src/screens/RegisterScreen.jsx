import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert("Empty Fields", "Please fill all the fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { cancelable: false }
      ]);
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // console.log("User Registered Successfully", userCredential);
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: user,
          phone: phone
        });
      }
    );
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <View className="w-full h-[300px] bg-white">
          <Image
            source={require("../../assets/images/register.png")}
            className="w-full h-full mx-auto mt-5 "
          />
        </View>
        <View className="mx-3 my-10 bg-white rounded-lg p-5">
          <Text className="text-2xl text-[#088f8f]">Welcome to WashWise</Text>
          <Text className="text-sm text-[#088f8f]">Register to continue</Text>
          <View className="mt-5">
            <Text className="text-sm text-[#088f8f]">Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              className="border-b-2 border-[#017481] w-full"
            />
          </View>
          <View className="mt-5">
            <Text className="text-sm text-[#088f8f]">Phone Number</Text>
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Enter your number"
              className="border-b-2 border-[#017481] w-full"
            />
          </View>
          <View className="mt-5">
            <Text className="text-sm text-[#088f8f]">Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter your password"
              className="border-b-2 border-[#017481] w-full"
            />
          </View>
          <View className="mt-5">
            <Pressable
              className="bg-[#088f8f] rounded-lg p-2"
              onPress={register}
            >
              <Text className="text-white text-center text-sm">Register</Text>
            </Pressable>
          </View>
          <Text className="text-sm text-[#088f8f] mt-5">
            Already have an account?{" "}
            <Text
              onPress={() => navigation.goBack()}
              className="text-[#017481] font-bold"
            >
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
