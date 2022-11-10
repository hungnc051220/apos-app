import axios from "axios";
import React, { useEffect, useState } from "react";
import {
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
import HeaderHome from "../components/HeaderHome";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
import { formatMoney } from "../ultis/common";

const OrderItem = ({ order }) => (
  <View className="bg-white mb-4 py-2 px-6 shadow-md space-y-1">
    <View className="flex-row items-center">
      <View className="w-1/2 items-start pr-1">
      <View className="bg-primary p-1 rounded-md self-start">
        <Text className="text-white">
          {order.table.name} - {order.floor.name}
        </Text>
      </View>
      </View>
      <View className="w-1/2 items-end pl-1">
        <Text
          className={`${
            order.status === "CANCELLED" ? "text-red-500" : "text-primary"
          } `}
        >
          {order.status === "CANCELLED" ? "Đã hủy" : "Đã thanh toán"}
        </Text>
      </View>
    </View>

    <View className="flex-row">
      <View className="w-1/2 items-start pr-1">
      <Text>
        {moment(order.logs[0].actionDatetime).format("HH:mm DD/MM/yyyy")}
      </Text>
      </View>
      <View className="w-1/2 items-end pl-1">
      <Text>Nhân viên: {order.logs[0].user.fullName}</Text>
      </View>
    </View>

    <View className="flex-row items-center">
      <View className="w-1/2 items-start pr-1">
       <Text className="text-gray-500">5 sản phẩm</Text>
      </View>
      <View className="w-1/2 items-end pl-1">
      <Text className="font-semibold text-secondary">
        {formatMoney(order.totalNetPrice)} ₫
      </Text>
      </View>
    </View>
    
  </View>
);

const HomeScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.post(
          "https://mseller-dev.azurewebsites.net/api/order/list",
          {},
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setOrders(response.data.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
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
        <View className="flex-1 bg-gray-200 pt-4 pb-[100px]">
          <View className="flex-row justify-between w-full items-center px-6 mb-3">
            <Text className="font-medium">Tất cả đơn hàng</Text>
            <View>
              <DropDownPicker
                placeholder="Nhân viên"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{
                  width: 172,
                  marginLeft: "auto",
                  borderColor: "rgba(0, 0, 0, 0.2)",
                }}
                placeholderStyle={{
                  color: "grey",
                }}
                arrowIconStyle={{
                  width: 20,
                  height: 20,
                  color: "red",
                }}
                dropDownContainerStyle={{
                  borderColor: "rgba(0, 0, 0, 0.2)",
                }}
              />
            </View>
          </View>

          <FlatList
            data={orders}
            keyExtractor={(x) => x.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <OrderItem order={item} />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
