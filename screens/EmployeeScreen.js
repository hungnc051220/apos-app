import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import AddFood from "../components/AddFood";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";

const Employee = ({ item }) => (
  <View className="flex-row justify-between items-center gap-3 py-3 px-6 border-b border-gray-200">
    {/* <Image source={{uri: ""}} /> */}
    <View className="w-12 h-12 rounded-full bg-gray-200"></View>
    <View className="flex-1 justify-center">
      <Text className="text-base font-semibold">{item.fullName}</Text>
      <Text className="text-sm text-gray-500">{item.phoneNumber}</Text>
    </View>
    <Text className="text-xs text-gray-500 w-[70px]">14/11/2022</Text>
    <Entypo name="dots-three-vertical" size={16} color="gray" />
  </View>
);

const EmployeeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const [employees, setEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getEmployees = async () => {
    setRefreshing(true);
    try {
      const response = await axios.post(
        "https://mseller-dev-1.azurewebsites.net/api/employee/list",
        {},
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setEmployees(response.data?.data?.content);
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const onRefresh = React.useCallback(() => {
    getEmployees();
  }, []);

  return (
    <View className="flex-1">
      <StatusBar style="light" translucent={true} />
      <ImageBackground
        source={require("../assets/background-login.png")}
        resizeMode="cover"
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1">
        <Header navigation={navigation} text="Quản lý nhân viên" />
        <View className="flex-1 bg-gray-100 px-6 pt-4 pb-16">
          <View className="pb-4 flex-row justify-between items-center">
            <View className="flex-row items-center border border-gray-300 w-full rounded-lg pl-3 pr-6">
              <Feather name="search" size={16} />
              <TextInput
                placeholder="Tìm tên nhân viên"
                className="p-3 rounded-lg"
              />
            </View>
          </View>
          <View className="bg-white -mx-6 min-h-[100px]">
            <FlatList
              data={employees}
              keyExtractor={(x) => x.id}
              renderItem={({ item }) => <Employee item={item} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View className="px-6 py-6 bg-gray-100">
          <TouchableOpacity className="bg-primary py-4 block w-full rounded-lg items-center">
            <Text className="text-white font-medium">Thêm nhân viên</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EmployeeScreen;
