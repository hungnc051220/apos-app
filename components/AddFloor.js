import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const AddFloor = () => {
  const user = useSelector((state) => state.auth.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [nameFloor, onChangeNameFloor] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddFloor = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://mseller-dev.azurewebsites.net/api/floor",
        {
          name: nameFloor,
        },
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Tạo tầng mới thành công!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: "Tạo tầng mới thất bại!",
      });
    }
    setLoading(false);
    setModalVisible(false);
  };

  return (
    <View className="mt-4">
      <TouchableOpacity
        className="bg-primary items-center justify-center py-2 px-4 rounded-lg"
        onPress={toggleModal}
      >
        <Text className="text-white">Thêm+</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} backdropOpacity={0.50} animationOutTiming={1000} backdropTransitionOutTiming={1000}>
        <View className="flex-1 -mx-4 -mb-4 justify-end">
          <View className="h-[252px] bg-white rounded-t-[32px] overflow-hidden p-6">
            <View className="items-end">
              <Feather name="x" size={24} onPress={toggleModal} />
            </View>
            <View>
              <Text className="mb-3 font-medium">Tên tầng</Text>
              <TextInput
                placeholder="Tên tầng"
                className="w-full block border border-gray-200 h-12 px-4 mb-6 rounded-lg"
                onChangeText={onChangeNameFloor}
              />
              <TouchableOpacity
                className="bg-primary py-4 block w-full rounded-lg items-center"
                onPress={handleAddFloor}
                disabled={loading}
              >
                {!loading ? (
                  <Text className="text-white text-sm font-medium">
                    Tạo tầng
                  </Text>
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

export default AddFloor;
