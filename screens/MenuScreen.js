import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList, ImageBackground, RefreshControl, Text, View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import AddFood from "../components/AddFood";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";

const MenuScreen = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);
  const [foods, setFoods] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const getFoods = async () => {
    setRefreshing(true);
    try {
      const response = await axios.post(
        "https://mseller-dev-1.azurewebsites.net/api/menu/food/list",
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
    setRefreshing(false);
  };
  
  useEffect(() => {
    getFoods();
  }, []);

  const onRefresh = React.useCallback(() => {
    getFoods();
  }, []);

  return (
    <View className="flex-1">
      <StatusBar style="light" translucent={true}/>
      <ImageBackground
        source={require("../assets/background-login.png")}
        resizeMode="cover"
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1">
        <Header navigation={navigation} text="Menu"/>
        <View className="flex-1 bg-gray-100 px-6 pt-4 pb-60">
          <View className="pb-4 flex-row justify-between items-center">
            <Text className="text-base font-medium">Món ăn</Text>
            <Feather name="search" size={16} />
          </View>
          <View className="bg-white -mx-6 py-4 px-6 min-h-[100px]">
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
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#2DB894"]}
                  tintColor="#2DB894"
                />
              }
            />
          </View>

          <View>
            <AddFood />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MenuScreen;
