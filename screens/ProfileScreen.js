import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import AddFloor from "../components/AddFloor";
import HeaderHome from "../components/HeaderHome";

const ProfileScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const [floors, setFloors] = useState({});

  const [refreshing, setRefreshing] = useState(false);

  const getFloors = async () => {
    setRefreshing(true);
    try {
      const response = await axios.post(
        "https://mseller-dev.azurewebsites.net/api/floor/list",
        {},
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setFloors(response.data?.data);
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    getFloors();
  }, []);

  const onRefresh = React.useCallback(() => {
    getFloors();
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
        <HeaderHome />
        <View className="flex-1 bg-[#EEEDED] px-6 pt-4 pb-[100px]">
          <View className="bg-white h-16 flex-row justify-between rounded-lg mb-4 divide-x divide-gray-200">
            <View className="w-1/2 items-center justify-center">
              <Text className="text-lg font-medium">Doanh thu</Text>
              <Text className="text-xs text-gray-500 text-center">
                Từ 01-10-2022 đến 30-10-2022
              </Text>
            </View>
            <View className="w-1/2 items-center justify-center">
              <Text className="text-secondary text-lg font-medium">
                50.000.000
              </Text>
            </View>
          </View>

          <View className="bg-white py-3 px-6 -mx-6 space-y-6">
            <View className="flex-row justify-between items-center">
              <Text className="font-medium">Ảnh đại diện</Text>
              <Image
                source={require("../assets/icon.png")}
                resizeMode="contain"
                className="h-10 w-10 rounded-full"
              />
            </View>
            <View className="flex-row justify-between">
              <Text className="font-medium">Họ và tên</Text>
              <Text>{user?.fullName}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="md-key-outline" size={16} color="#2DB894" />
              <Text className="font-medium ml-3">Đổi mật khẩu</Text>
            </View>
            <View className="flex-row items-center">
              <Feather name="phone-call" size={16} color="#2DB894" />
              <Text className="font-medium ml-3">Đổi số điện thoại</Text>
            </View>
          </View>

          <View className="bg-white py-3 px-6 -mx-6 space-y-6 mt-3">
            <View className="flex-row items-center">
              <Feather name="credit-card" size={16} color="#2DB894" />
              <Text className="font-medium ml-3">Tài khoản/ Ngân hàng</Text>
            </View>
            <View className="flex-row items-center">
              <Feather name="settings" size={16} color="#2DB894" />
              <Text className="font-medium ml-3">Cài đặt cửa hàng</Text>
            </View>

            <View className="flex-row items-center">
              <MaterialIcons name="group" size={16} color="#2DB894" />
              <Text className="font-medium ml-3">Danh sách nhân viên</Text>
            </View>

            <View className="flex-row items-center">
              <MaterialIcons name="security" size={16} color="#2DB894" />
              <Text className="font-medium ml-3">Chính sách bảo mật</Text>
            </View>
          </View>

          <View className="bg-white py-3 px-6 -mx-6 space-y-6 mt-3">
            <View className="flex-row items-center">
              <Feather name="log-out" size={16} color="#2DB894" />
              <Text className="font-medium ml-3">Đăng xuất</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
