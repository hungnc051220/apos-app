import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const AddTable = ({ floorId, getFloors }) => {
  const user = useSelector((state) => state.auth.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [nameTable, onChangeNameTable] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddTable = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://mseller-dev-1.azurewebsites.net/api/table",
        {
          floorId,
          name: nameTable,
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
        text2: "Tạo bàn mới thành công!",
      });
    } catch (error) {
      setModalVisible(false);
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: "Tạo bàn mới thất bại!",
      });
    }
    setLoading(false);
  };
  return (
    <View className="h-[108px] w-1/3 p-2">
      <TouchableOpacity
        onPress={toggleModal}
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 8,
          borderStyle: "dashed",
          borderColor: "#2DB894",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 8,
        }}
      >
        <Feather name="plus" size={24} color="#2DB894" />
        <Text className="text-primary font-medium text-xs mt-2">Thêm bàn</Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationOutTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View className="flex-1 -mx-5 -mb-5 justify-end">
          <View className="bg-white rounded-t-[32px] overflow-hidden p-6">
            <View className="items-end">
              <Feather name="x" size={24} onPress={toggleModal} />
            </View>
            <View>
              <Text className="mb-3 font-medium">Tên bàn</Text>
              <TextInput
                placeholder="Tên bàn"
                className="w-full block border border-gray-200 h-12 px-4 mb-6 rounded-lg"
                onChangeText={onChangeNameTable}
              />
              <TouchableOpacity
                className="bg-primary py-4 mb-4 block w-full rounded-lg items-center"
                onPress={handleAddTable}
                disabled={loading}
              >
                {!loading ? (
                  <Text className="text-white text-sm font-medium">
                    Tạo bàn
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

export default AddTable;
