import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";

const AddFood = () => {
  const user = useSelector((state) => state.auth.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: 100,
    price: 0,
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await axios.post(
          "https://mseller-dev.azurewebsites.net/api/menu/group/list",
          {},
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const transformResponse = response.data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setItems(transformResponse);
      } catch (error) {
        console.log(error);
      }
    };

    getGroups();
  }, []);

  // const handleAddFood = async () => {
  //   const data = {
  //     ...formData,
  //     groupId: value,
  //   };

  //   const json = JSON.stringify(data);
  //   const blob = new Blob([json], {
  //     type: "application/json",
  //   });

  //   const formData = new FormData();
  //   formData.append("body", blob);
  //   formData.append("image", image);

  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "https://mseller-dev.azurewebsites.net/api/menu/food",
  //       formData,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           authorization: `Bearer ${user?.token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     Toast.show({
  //       type: "success",
  //       text1: "Thành công",
  //       text2: "Tạo món ăn thành công!",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     Toast.show({
  //       type: "error",
  //       text1: "Thất bại",
  //       text2: "Tạo món ăn thất bại!",
  //     });
  //   }
  //   setLoading(false);
  //   setModalVisible(false);
  // };

  const handleAddFood = async () => {
    const data = {
      name: "Thắng chicken 97",
      groupId: "63686ff1dab7d83a0de560f8",
      quantity: 10,
      price: 10,
    };

    const json = JSON.stringify(data);
    const blob = new Blob([json], {
      type: "application/json",
    });

    console.log(image);

    const formData = new FormData();
    formData.append("body", blob);
    formData.append("image", image);

    //setLoading(true);
    try {
      const response = await axios.post(
        "https://mseller-dev.azurewebsites.net/api/menu/food",
        formData,
        {
          headers: {
            'Accept': 'application/json',
            authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwOTQyMzQ5ODk0Iiwicm9sZXMiOlsiUk9MRV9CUkFOQ0giXSwiaWF0IjoxNjY4MTYzMTY0LCJleHAiOjE2NjgxNjY3NjR9.ru9Pi5O3Qx-cfK1P_8PF_soE2UuoXo9XEH_A76nLUWE`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="mt-4">
      <TouchableOpacity
        className="bg-primary py-4 block w-full rounded-lg items-center"
        onPress={toggleModal}
      >
        {!loading ? (
          <Text className="text-white text-sm font-medium">Thêm món</Text>
        ) : (
          <ActivityIndicator size={20} color="#fff" />
        )}
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationOutTiming={1000}
        backdropTransitionOutTiming={1000}
      >
        <View className="flex-1 -mx-4 -mb-4 justify-end">
          <View className="bg-white rounded-t-[32px] overflow-hidden p-6">
            <View className="items-end">
              <Feather name="x" size={24} onPress={toggleModal} />
            </View>
            <View className="space-y-2 mt-2 mb-4">
              <TouchableOpacity
                className="bg-white rounded-lg self-start px-2 pt-1 pb-2 border border-primary flex-row gap-1 items-center"
                onPress={pickImage}
              >
                <Feather name="image" size={16} color="#2DB894" />
                <Text className="text-primary">Tải ảnh lên</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white rounded-lg self-start px-2 pt-1 pb-2 border border-primary flex-row gap-1 items-center"
                onPress={pickImage}
              >
                <Feather name="image" size={16} color="#2DB894" />
                <Text className="text-primary">Tải ảnh lên</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View className="mb-4">
                <Text className="mb-3 font-medium">
                  Nhóm món <Text className="text-red-500">*</Text>
                </Text>
                <DropDownPicker
                  placeholder="Nhóm món ăn"
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={{
                    width: "100%",
                    borderColor: "#ececec",
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
              <Text className="mb-3 font-medium">
                Tên món <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                placeholder="Tên món"
                className="w-full block border border-gray-200 h-12 px-4 mb-4 rounded-lg"
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
              <Text className="mb-3 font-medium">
                Giá tiền <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                placeholder="Giá tiền"
                keyboardType="number-pad"
                className="w-full block border border-gray-200 h-12 px-4 mb-12 rounded-lg"
                onChangeText={(text) =>
                  setFormData({ ...formData, price: Number(text) })
                }
              />
              <TouchableOpacity
                className="bg-primary py-4 block w-full rounded-lg items-center"
                onPress={handleAddFood}
                disabled={loading}
              >
                {!loading ? (
                  <Text className="text-white text-sm font-medium">
                    Tạo món
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

export default AddFood;
