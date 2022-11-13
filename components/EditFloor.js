import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import AntDesign from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";

const EditFloor = ({ getFloors, tableId, tableName, floorId, floors }) => {
  const user = useSelector((state) => state.auth.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = useState("");
  const [floor, onChangeFloor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    onChangeName(tableName);
    setValue(floorId)
  }, [tableName, floorId]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    onChangeName(tableName);
    setValue(floorId);
  };

  const handleAddFloor = async () => {
    console.log(tableId);
    setLoading(true);
    const body = {
      id: tableId,
      floorId,
      name: name,
    };

    if(value){
      body.newFloorId = value;
    }

    try {
      await axios.put(
        "https://mseller-dev-1.azurewebsites.net/api/table",
        body,
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
        text2: "Sửa bàn thành công!",
      });
    } catch (error) {
      const message = error.response.data?.title || "Sửa bàn thất bại!";
      setModalVisible(false);
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: message,
      });
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoadingDelete(true);    
    try {
      await axios.delete(
        `https://mseller-dev-1.azurewebsites.net/api/table/${tableId}`,
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
        text2: "Xóa bàn thành công!",
      });
    } catch (error) {
      console.log(error.response.data);
      const message = error.response.data?.title || "Xóa bàn thất bại!";
      setModalVisible(false);
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: message,
      });
    }
    setLoadingDelete(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleModal}
        className="pr-2 pt-[6px] flex-row h-full"
      >
        <AntDesign name="edit" size={14} color="white" />
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
                value={name}
                onChangeText={onChangeName}
              />

              <Text className="mb-3 font-medium">Tên tầng</Text>
              <DropDownPicker
                  placeholder="Tên tầng"
                  open={open}
                  value={value}
                  items={floors.map((item) => ({value: item.id, label: item.name}))}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={{
                    width: "100%",
                    borderColor: "#ececec",
                    marginBottom: 48
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
              <View className="flex-row space-x-2">
              <TouchableOpacity
                className="border border-primary py-4 mb-4 rounded-lg items-center flex-1"
                onPress={handleDelete}
                disabled={loadingDelete}
              >
                {!loadingDelete ? (
                  <Text className="text-primary text-sm font-medium">
                    Xóa
                  </Text>
                ) : (
                  <ActivityIndicator size={20} color="#2DB894" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary py-4 mb-4 rounded-lg items-center flex-1"
                onPress={handleAddFloor}
                disabled={loading}
              >
                {!loading ? (
                  <Text className="text-white text-sm font-medium">
                    Cập nhật
                  </Text>
                ) : (
                  <ActivityIndicator size={20} color="#fff" />
                )}
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EditFloor;
