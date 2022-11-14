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
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import AddFood from "../components/AddFood";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";

const BankAccountScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const [employees, setEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getEmployees = async () => {
    setRefreshing(true);
    try {
      const response = await axios.post(
        "https://mseller-dev-1.azurewebsites.net/api/branch/list",
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
        <Header navigation={navigation} text="Tài khoản/Ngân hàng" />
        <View className="flex-1 bg-gray-100 pb-16">
            <Text className="px-6 py-4 font-medium text-base">Liên kết hiện tại</Text>
            <View className="py-4 px-6 flex-row bg-white items-center">
                <AntDesign name="wallet" size={16} />
                <Text className="text-primary font-medium ml-3">+ Thêm ngân hàng</Text>
            </View>
        </View>

      </SafeAreaView>
    </View>
  );
};

export default BankAccountScreen;
