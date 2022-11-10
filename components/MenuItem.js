import { View, Text, Image } from "react-native";
import React from "react";
import { formatMoney } from "../ultis/common";

const MenuItem = ({ food }) => {
  return (
    <View className="flex-row gap-4 mb-4">
      <Image source={{ uri: food.image }} className="h-16 w-16 rounded-lg" />
      <View>
        <Text className="mb-2 font-medium">{food.name}</Text>
        <Text className="text-secondary font-medium">
          {formatMoney(food.price)} ₫
        </Text>
      </View>
    </View>
  );
};

export default MenuItem;
