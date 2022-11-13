import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import AddFloor from "../components/AddFloor";
import AddTable from "../components/AddTable";
import HeaderHome from "../components/HeaderHome";
import EditFloor from "../components/EditFloor";
import Toast from 'react-native-toast-message';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const [floors, setFloors] = useState([]);
  const [total, setTotal] = useState({
    tableCount: 0,
    tableEmpty: 0,
  });
  const [floorLables, setFloorLables] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const getFloors = async () => {
    setRefreshing(true);
    try {
      const response = await axios.post(
        "https://mseller-dev-1.azurewebsites.net/api/floor/list",
        {},
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setTotal({
        tableCount: response.data?.data.tableTotalCount,
        tableEmpty: response.data?.data.tableEmptyCount,
      });
      setFloorLables(
        response.data?.data.floors.map((item) => ({
          id: item.id,
          name: item.name,
        }))
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

  useEffect(() => {
    const getFloorById = async () => {
      if (!selectedFloor) {
        getFloors();
        return;
      }

      setRefreshing(true);
      try {
        const response = await axios.get(
          `https://mseller-dev-1.azurewebsites.net/api/floor/${selectedFloor}`,
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const transformResponse = { ...total, floors: [response.data?.data] };
        setFloors(transformResponse);
      } catch (error) {
        console.log(error);
      }
      setRefreshing(false);
    };

    getFloorById();
  }, [selectedFloor]);

  const onRefresh = React.useCallback(() => {
    getFloors();
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
        <HeaderHome />
        <Button title="Press" onPress={() => Toast.show({type: "error",
        text1: "Thất bại", text2: "Bàn đã tồn tại!"})}>
          </Button>
        <View className="flex-1 bg-[#EEEDED] px-6 pt-4 pb-[100px]">
          <View className="bg-white h-14 flex-row justify-between px-6 rounded-lg mb-4">
            <Text className="self-center font-medium text-gray-500">
              Số bàn trống:{" "}
              <Text className="text-primary">{total.tableEmpty}</Text>
            </Text>
            <View className="w-[2px] bg-gray-100 h-[90%] my-auto"></View>
            <Text className="self-center font-medium text-gray-500">
              Đang sử dụng:{" "}
              <Text className="text-orange-500">{total.tableCount}</Text>
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <Text
                  className={`mr-6 font-medium ${
                    selectedFloor === null ? "text-primary" : "text-gray-500"
                  }`}
                  onPress={() => setSelectedFloor(null)}
                >
                  Tất cả
                </Text>
              </View>
              {floorLables?.map((item) => (
                <Text
                  key={item.id}
                  className={`mr-6 ${
                    selectedFloor === item.id ? "text-primary" : "text-gray-500"
                  } font-medium`}
                  onPress={() => setSelectedFloor(item.id)}
                >
                  {item.name}
                </Text>
              ))}
            </ScrollView>

            <AddFloor getFloors={getFloors} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="mt-4 -mx-6"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#2DB894"]}
                tintColor="#2DB894"
              />
            }
            keyboardShouldPersistTaps={"handled"}
          >
            {floors?.floors?.map((item) => (
              <View key={item.id} className="mb-6 bg-[#FAF6F3] py-5">
                <View className="flex-row justify-between items-center mb-4 px-6">
                  <Text className="font-semibold">{item.name}</Text>
                  <Text className="text-xs">
                    Còn trống:{" "}
                    <Text className="text-primary">{item.emptyTableTotal}</Text>
                  </Text>
                </View>
                <View className="flex-row flex-wrap px-4">
                  {item?.tables.map((table) => (
                    <View key={table.id} className="h-[108px] w-1/3 p-2">
                      <View className="flex-1 bg-white items-center rounded-lg overflow-hidden">
                        <View
                          className={`flex-row items-center justify-between ${
                            table.status === true ? "bg-[#8E8E8E]" : "bg-primary"
                          } w-full`}
                        >
                          <View className="w-5"></View>
                          <Text className="text-white uppercase flex-1 text-center py-1">
                            {table.name}
                          </Text>
                          {table.status === true ? (
                            <View className="w-4"></View>
                          ) : (
                            <EditFloor floorId={item.id} tableId={table.id} tableName={table.name} floors={floorLables} getFloors={getFloors} />
                          )}
                        </View>
                        <TouchableOpacity
                          className="justify-center items-center flex-1"
                          onPress={
                            table.status === false
                              ? () =>
                                  navigation.navigate("OrderList", {
                                    name: "ok",
                                  })
                              : undefined
                          }
                        >
                          {table.status === true ? (
                            <Feather name="clock" size={24} color="#8E8E8E" />
                          ) : (
                            <Feather
                              name="check-circle"
                              size={24}
                              color="#2DB894"
                            />
                          )}
                          <Text
                            className={`mt-2 ${
                              table.status === true
                                ? "text-[#8E8E8E]"
                                : "text-primary"
                            } font-medium text-xs`}
                          >
                            {table.status === true ? "Đang sử dụng" : "Sẵn sàng"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                  <AddTable floorId={item.id} getFloors={getFloors} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
