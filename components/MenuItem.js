import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { formatMoney } from "../ultis/common";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useSelector } from "react-redux";

const MenuItem = ({ food }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  console.log(cart);
  return (
    <View className="flex-row gap-4 mb-4 justify-between">
      <Image source={{ uri: food.image }} className="h-16 w-16 rounded-lg" />
      <View className="flex-1">
        <Text className="mb-2 font-medium">{food.name}</Text>
        <Text className="text-secondary font-medium">
          {formatMoney(food.price)} ₫
        </Text>
      </View>
      <View className="flex-row w-24 items-center justify-center">
        <View className="bg-gray-200 flex-row items-center justify-center rounded-lg p-2 space-x-2">
          <TouchableOpacity
            className="w-6 h-6 items-center justify-center"
            onPress={() => dispatch(addToCart({ foodId: food.id, quantity: 5 }))}
          >
            <AntDesign name="minus" color="#000" />
          </TouchableOpacity>
          <Text>10</Text>
          <TouchableOpacity className="w-6 h-6 items-center justify-center">
            <AntDesign name="plus" color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuItem;
