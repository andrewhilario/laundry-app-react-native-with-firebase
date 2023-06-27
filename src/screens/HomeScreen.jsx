import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import ProductsService from "../components/ProductsService";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { defaultUserProfileImage } from "../../constants";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  // console.log(cart);
  const navigation = useNavigation();
  const [items, setItem] = useState([]);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching you location..."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Enable",
            onPress: () => console.log("Enable Pressed")
          },
          { cancelable: false }
        ]
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Allow",
            onPress: () => console.log("Allow Pressed")
          },
          { cancelable: false }
        ]
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      // console.log(response);

      for (let item of response) {
        let address = `${item.name},${item.city},${item.postalCode}`;
        setDisplayCurrentAddress(address);
        break;
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  // console.log('product array', product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = async () => {
      const colRef = collection(db, "types");
      const docSnap = await getDocs(colRef);

      docSnap.forEach((doc) => {
        items.push(doc.data());
      });

      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  // console.log(auth.currentUser.photoURL);
  // const services = [
  //   {
  //     id: "0",
  //     image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
  //     name: "shirt",
  //     quantity: 0,
  //     price: 10
  //   },
  //   {
  //     id: "11",
  //     image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
  //     name: "T-shirt",
  //     quantity: 0,
  //     price: 10
  //   },
  //   {
  //     id: "12",
  //     image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
  //     name: "dresses",
  //     quantity: 0,
  //     price: 10
  //   },
  //   {
  //     id: "13",
  //     image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
  //     name: "jeans",
  //     quantity: 0,
  //     price: 10
  //   },
  //   {
  //     id: "14",
  //     image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
  //     name: "Sweater",
  //     quantity: 0,
  //     price: 10
  //   },
  //   {
  //     id: "15",
  //     image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
  //     name: "shorts",
  //     quantity: 0,
  //     price: 10
  //   },
  //   {
  //     id: "16",
  //     image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
  //     name: "Sleeveless",
  //     quantity: 0,
  //     price: 10
  //   }
  // ];
  return (
    <>
      <ScrollView>
        {/* Location and Profile */}
        <View className="flex flex-row items-center text-black p-[10]">
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text className="font-semibold text-sm text-black">Home</Text>
            <Text className="text-black">{displayCurrentAddress}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            className="ml-auto mr-4"
          >
            <Image
              className="rounded-full w-12 h-12"
              source={{
                uri:
                  auth.currentUser.photoURL === null
                    ? defaultUserProfileImage
                    : auth.currentUser.photoURL
              }}
            />
          </Pressable>
        </View>
        {/* Search Bar */}
        <View className="p-3 m-3 flex-row items-center justify-between border-[0.8px] border-[#c0c0c0] rounded-xl">
          <TextInput placeholder="Search for items or More" />
          <Feather name="search" size={24} color="black" />
        </View>
        {/* Image Carousel */}
        <Carousel />
        {/* Services */}
        <Services />

        {product.map((item, index) => (
          <ProductsService item={item} key={index} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable className="bg-teal-600 text-white p-4 mb-[30] m-[15] rounded-md flex-row items-center justify-between">
          <View>
            <Text className="text-white text-[17px] font-medium">
              {cart.length} items | ${total}
            </Text>
            <Text className="text-white text-[13px] font-normal">
              Extra charges might apply
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text className="text-[17px] font-semibold text-white">
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;
