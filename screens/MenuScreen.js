import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import AddFloor from "../components/AddFloor";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";

const MenuScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState({});

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.post(
          "https://mseller-dev.azurewebsites.net/api/menu/food/list",
          {},
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setFoods(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFoods();
  }, []);

  return (
    <View className="flex-1">
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../assets/background-login.png")}
        resizeMode="cover"
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1">
        <Header />
        <View className="flex-1 bg-[#EEEDED] px-6 pt-4 pb-[100px]">
          <View className="bg-white -mx-6 py-4 px-6">
            <FlatList
              data={foods}
              keyExtractor={(x) => x.id}
              renderItem={({ item }) => (
                <View>
                  <Text className="font-medium mb-2">{item.name}</Text>
                  <FlatList
                    data={item.foods}
                    keyExtractor={(x) => x.id}
                    renderItem={({ item }) => <MenuItem food={item} />}
                  />
                </View>
              )}
            />
          </View>

          <View className="flex-1 justify-end py-10">
            <TouchableOpacity
              className="bg-primary py-4 block w-full rounded-lg items-center"
              // onPress={handleLogin}
              // disabled={loading}
            >
              {!loading ? (
                <Text className="text-white text-sm font-medium">Thêm món</Text>
              ) : (
                <ActivityIndicator size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MenuScreen;
