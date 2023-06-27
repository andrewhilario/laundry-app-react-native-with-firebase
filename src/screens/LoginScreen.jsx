import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("User Credentials", userCredential);
      const user = userCredential.user;
      console.log("User", user);
    });
  };
  return (
    <ScrollView>
      {loading ? (
        <View className="w-full h-[300px] bg-white">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <KeyboardAvoidingView behavior="position">
          <View className="w-full h-[300px] bg-white">
            <Image
              source={require("../../assets/images/login.png")}
              className="w-full h-full mx-auto mt-5 "
            />
          </View>
          <View className="mx-3 my-10 bg-white rounded-lg p-5">
            <Text className="text-2xl text-[#088f8f]">Welcome to WashWise</Text>
            <Text className="text-sm text-[#088f8f]">
              Please login to continue
            </Text>
            <View className="mt-5">
              <Text className="text-sm text-[#088f8f]">Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setEmail(text)}
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
                onPress={login}
                className="bg-[#088f8f] rounded-lg p-2"
              >
                <Text className="text-white text-center text-sm">Login</Text>
              </Pressable>
            </View>
            <Text className="text-sm text-[#088f8f] mt-5">
              Don't have an account?{" "}
              <Text
                onPress={() => navigation.navigate("Register")}
                className="text-[#017481] font-bold"
              >
                Register
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      )}
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
