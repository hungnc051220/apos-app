import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
} from "victory-native";

const OrderReportScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100 pt-3 mb-[120px]" showsVerticalScrollIndicator={false}>
      <View className="mb-4 bg-white h-12 items-center justify-center">
        <Text>Tháng này</Text>
      </View>
      <View className="px-6 flex-row space-x-3">
        <View className="flex-1 bg-white h-12 rounded-lg justify-center">
          <Text className="text-secondary font-medium pl-4">
            100 <Text className="text-gray-500">đơn</Text>
          </Text>
          <Text className="pl-4 text-xs">Doanh thu</Text>
        </View>
        <View className="flex-1 bg-white h-12 rounded-lg justify-center">
          <Text className="text-primary font-medium pl-4">
            18% <Text className="text-gray-500">tăng</Text>
          </Text>
          <Text className="pl-4 text-xs">Tỷ lệ tăng trưởng</Text>
        </View>
      </View>
      <View className="px-6 flex-row space-x-3 mt-3 mb-6">
        <View className="flex-1 bg-white h-12 rounded-lg justify-center">
          <Text className="font-medium pl-4">
            2<Text className="text-gray-500">/40 phòng bàn</Text>
          </Text>
          <Text className="pl-4 text-xs">Đang sử dụng</Text>
        </View>
        <View className="flex-1 bg-white h-12 rounded-lg justify-center">
          <Text className="text-red-500 font-medium pl-4">
            20 <Text className="text-gray-500">món</Text>
          </Text>
          <Text className="pl-4 text-xs">Bán chạy</Text>
        </View>
      </View>

      <View>
        <Text className="pl-6 font-medium mb-4">Tổng doanh thu tháng này</Text>
        <View className="bg-white h-[260px]">
        <VictoryChart height={260} theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: { stroke: "#2DB894" },
                parent: { border: "1px solid #ccc" },
              }}
              data={[
                { x: "Oct 12", y: 2 },
                { x: "Oct 13", y: 5 },
                { x: "Oct 14", y: 4 },
                { x: "Oct 15", y: 7 },
                { x: "Oct 16", y: 6 },
                { x: "Oct 17", y: 4 },
                { x: "Oct 18", y: 8 },
                { x: "Oct 19", y: 9 },
              ]}
            />
             <VictoryLine
              style={{
                data: { stroke: "#D75252" },
                parent: { border: "1px solid #ccc" },
              }}
              data={[
                { x: "Oct 12", y: 1 },
                { x: "Oct 13", y: 2 },
                { x: "Oct 14", y: 3 },
                { x: "Oct 15", y: 5 },
                { x: "Oct 16", y: 4 },
                { x: "Oct 17", y: 6 },
                { x: "Oct 18", y: 7 },
                { x: "Oct 19", y: 8 },
              ]}
            />
          </VictoryChart>
        </View>
      </View>

      <View className="bg-white mt-4 mb-6 mx-6 rounded-lg py-2 px-4">
        <Text className="font-medium">Trung bình doanh thu theo ngày</Text>
        <Text className="text-primary font-medium mt-2">0đ</Text>
      </View>
    </ScrollView>
  );
};

export default OrderReportScreen;
