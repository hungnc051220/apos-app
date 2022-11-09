import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
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

const HomeScreen = () => {
  const user = useSelector(state => state.auth.user);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          "https://mseller-dev.azurewebsites.net/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setProfile(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
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
        <View className="flex-row">
          <View className="flex-row pt-3 px-6 pb-4">
            <Image
              source={require("../assets/icon.png")}
              resizeMode="contain"
              className="h-12 w-12 rounded-full mr-2"
            />
            <View className="justify-center">
              <Text className="text-white">{profile?.fullName}</Text>
              <Text style={{ fontSize: 10 }} className="text-white">
                Quản lý
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-1 bg-[#EEEDED] px-6 pt-4">
          <View className="bg-white h-14 flex-row justify-between px-6 rounded-lg mb-4">
            <Text className="self-center font-medium text-gray-500">
              Số bàn trống: <Text className="text-primary">20</Text>
            </Text>
            <View className="w-[2px] bg-gray-100 h-[90%] my-auto"></View>
            <Text className="self-center font-medium text-gray-500">
              Đang sử dụng <Text className="text-orange-500">10</Text>
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <Text className="mr-6 font-medium text-primary">Tất cả</Text>
              </View>
              <Text className="mr-6 text-gray-500 font-medium">Tầng 1</Text>
              <Text className="mr-6 text-gray-500 font-medium">Tầng 2</Text>
              <Text className="mr-6 text-gray-500 font-medium">Tầng 2</Text>
              <Text className="mr-6 text-gray-500 font-medium">Tầng 2</Text>
              <Text className="mr-6 text-gray-500 font-medium">Tầng 2</Text>
              <Text className="mr-6 text-gray-500 font-medium">Tầng 2</Text>
              <Text className="mr-6 text-gray-500 font-medium">Tầng 2</Text>
              <Text className="mr-6 text-gray-500 font-medium">Tầng 2</Text>
              <Text className="mr-6 text-gray-500 font-medium">Tầng 2</Text>
            </ScrollView>
            <TouchableOpacity className="bg-primary items-center justify-center py-2 px-4 rounded-lg">
              <Text className="text-white">Thêm+</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            backgroundColor="#FAF6F3"
            className="-mx-6 mt-4 py-5 px-6"
          >
            <View className="mb-10">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-semibold">Tầng 1</Text>
                <Text className="text-xs">
                  Còn trống: <Text className="text-primary">02</Text>
                </Text>
              </View>
              <View className="flex-row gap-4">
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="mb-10">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-semibold">Tầng 1</Text>
                <Text className="text-xs">
                  Còn trống: <Text className="text-primary">02</Text>
                </Text>
              </View>
              <View className="flex-row gap-4">
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="mb-10">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-semibold">Tầng 1</Text>
                <Text className="text-xs">
                  Còn trống: <Text className="text-primary">02</Text>
                </Text>
              </View>
              <View className="flex-row gap-4">
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="mb-10">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-semibold">Tầng 1</Text>
                <Text className="text-xs">
                  Còn trống: <Text className="text-primary">02</Text>
                </Text>
              </View>
              <View className="flex-row gap-4">
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="mb-10">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-semibold">Tầng 1</Text>
                <Text className="text-xs">
                  Còn trống: <Text className="text-primary">02</Text>
                </Text>
              </View>
              <View className="flex-row gap-4">
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center bg-white h-[100px] rounded-lg overflow-hidden">
                  <View className="items-center py-1 bg-primary w-full">
                    <Text className="text-white">BÀN 2</Text>
                  </View>
                  <View className="justify-center items-center flex-1">
                    <Feather name="check-circle" size={16} color="#2DB894" />
                    <Text className="mt-4 text-primary font-medium text-xs">
                      Sẵn sàng
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
