import axios from "axios";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import AddFood from "../components/AddFood";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import { listStatus } from "../constants/status";

const OrderDetailScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const user = useSelector((state) => state.auth.user);
  const [order, setOrder] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const getOrder = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(
        `https://mseller-dev-1.azurewebsites.net/api/order/${orderId}`,
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setOrder(response.data?.data);
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    getOrder();
  }, [orderId]);

  const onRefresh = React.useCallback(() => {
    getFoods();
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
        <Header navigation={navigation} text="Chi tiết đơn hàng" />
        {!refreshing && (
          <View className="flex-1 bg-gray-100">
            <View className="bg-white px-6 py-4">
              <View className="flex-row justify-between mb-4 items-center">
                <View className="bg-primary p-1 rounded-md self-start">
                  <Text className="text-white">
                    {order?.floor?.name} - {order?.table?.name}
                  </Text>
                </View>
                <Text className={listStatus[order?.status]?.color}>
                  {listStatus[order?.status]?.label}
                </Text>
              </View>
              {order?.status === "CANCELLED" ? (
                <View className="space-y-2">
                  <Text>Lý do huỷ đơn: {order.logs?.[1]?.reasonCancel}</Text>
                  <Text>
                    Thời gian vào:{" "}
                    {moment(order.logs?.[0]?.actionDatetime).format(
                      "HH:mm DD/mm/yyyy"
                    )}
                  </Text>
                  <Text>
                    Thời gian huỷ:{" "}
                    {moment(order.logs?.[1]?.actionDatetime).format(
                      "HH:mm DD/mm/yyyy"
                    )}
                  </Text>
                </View>
              ) : (
                <View className="space-y-2">
                  <Text>
                    Phương thức thanh toán: {order.logs?.[0]?.reasonCancel}
                  </Text>
                  <Text>
                    Thời gian vào:{" "}
                    {moment(order.logs?.[0]?.actionDatetime).format(
                      "HH:mm DD/mm/yyyy"
                    )}
                  </Text>
                  <Text>
                    Thời gian thanh toán:{" "}
                    {moment(order.logs?.[0]?.actionDatetime).format(
                      "HH:mm DD/mm/yyyy"
                    )}
                  </Text>
                </View>
              )}
            </View>

            <View className="bg-white py-2 px-6 mt-4 flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icon.png")}
                className="w-7 h-7 rounded-full"
              />
              <Text className="font-medium">
                {order.logs?.[0]?.user?.fullName}
              </Text>
            </View>

            <View className="flex-1 bg-white mt-4 py-4 px-6">
              <FlatList
                data={order?.foods || []}
                keyExtractor={(x) => x.id}
                renderItem={({ item }) => <MenuItem food={item} />}
              />
            </View>
            <View className="bg-white mt-4 px-6 py-4">
              <View className="flex-row justify-between mb-4 items-center">
                <Text className="text-gray-500 font-medium">Thành tiền</Text>
                <Text className="font-medium">290.000.000đ</Text>
              </View>
              <View className="flex-row justify-between mb-4 items-center">
                <Text className="text-gray-500 font-medium">Khuyến mãi</Text>
                <Text className="font-medium">0đ</Text>
              </View>
              <View className="flex-row justify-between mb-4 items-center">
                <Text className="text-gray-500 font-medium">Thuế VAT(10%)</Text>
                <Text className="font-medium">290.000.00đ</Text>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default OrderDetailScreen;
