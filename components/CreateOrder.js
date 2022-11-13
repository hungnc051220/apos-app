import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import MenuItem from "./MenuItem";
import { useDispatch } from "react-redux";

const CreateOrder = ({ getFloors }) => {
  const user = useSelector((state) => state.auth.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [nameFloor, onChangeNameFloor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getFoods = async () => {
    setRefreshing(true);
    try {
      const response = await axios.post(
        "https://mseller-dev-1.azurewebsites.net/api/menu/food/list",
        {},
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setFoods(response.data?.data);
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    getFoods();
  }, []);

  const onRefresh = React.useCallback(() => {
    getFoods();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddFloor = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://mseller-dev-1.azurewebsites.net/api/floor",
        {
          name: nameFloor,
        },
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setModalVisible(false);
      getFloors();
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Tạo tầng mới thành công!",
      });
    } catch (error) {
      setModalVisible(false);
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: "Tạo tầng mới thất bại!",
      });
    }
    setLoading(false);
  };

  return (
    <View className="w-1/2 py-2 pr-2 pl-0">
      <TouchableOpacity
        className="items-center h-12 justify-center rounded-lg border border-primary"
        onPress={toggleModal}
      >
        <Text className="text-primary font-medium">Thêm món</Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationOutTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View className="flex-1 -mx-5 -mb-5 justify-end">
          <View className="bg-white rounded-t-[32px] overflow-hidden p-6 pt-3 h-[85%]">
            <View className="justify-between items-center flex-row mb-4 ">
              <View></View>
              <Text className="font-semibold ml-8 text-base">Thêm món</Text>
              <TouchableOpacity
                className="items-end p-2 pr-0"
                onPress={toggleModal}
              >
                <Feather name="x" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <View className="flex-1 pb-10">
              <FlatList
                data={foods}
                keyExtractor={(x) => x.id}
                renderItem={({ item }) => (
                  <View>
                    <Text className="font-medium mb-2">{item.name}</Text>
                    <FlatList
                      data={item.foods}
                      keyExtractor={(x) => x.id}
                      renderItem={({ item }) => <MenuItem food={item} />}
                    />
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#2DB894"]}
                    tintColor="#2DB894"
                  />
                }
              />
            </View>
            <View>
              <Text className="mb-4 text-gray-500 font-medium">
                Món đã chọn (
                <Text className="font-medium text-primary">04</Text>)
              </Text>
              <TouchableOpacity
                className="bg-primary py-4 mb-4 block w-full rounded-lg items-center"
                onPress={handleAddFloor}
                disabled={loading}
              >
                {!loading ? (
                  <Text className="text-white text-sm font-medium">Xong</Text>
                ) : (
                  <ActivityIndicator size={20} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateOrder;
