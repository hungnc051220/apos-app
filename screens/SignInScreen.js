import { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const SignInScreen = () => {
  const [toggle, setToggle] = useState(false);
  const [phoneNumber, onChangePhoneNumber] = useState(null);
  const [password, onChangePassword] = useState(null);
  const loading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ phoneNumber, password }));
  };

  return (
    <View className="flex-1">
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../assets/background-login.png")}
        resizeMode="cover"
        className="flex-1 absolute inset-0"
        style={{ height: Dimensions.get("window").height, width: "auto" }}
      />
      <View className="h-1/3 justify-center items-center">
        <View className="h-20 w-20 bg-white rounded-2xl mb-4 items-center justify-center">
          <Image source={require("../assets/logo.png")} />
        </View>
        <Text className="text-white font-semibold text-base">
          Trợ lý đắc lực của cửa hàng
        </Text>
      </View>
      <View className="h-2/3 bg-white p-6 rounded-t-[32px] items-center">
        <Text className="text-2xl leading-7 font-semibold text-primary mb-6">
          Đăng nhập
        </Text>
        <TextInput
          placeholder="Số điện thoại"
          className="w-full block border border-gray-200 h-12 px-4 mb-4 rounded-lg"
          onChangeText={onChangePhoneNumber}
        />
        <View className="flex-row w-full border border-gray-200 rounded-lg h-12 items-center px-4">
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry={toggle ? true : false}
            className="flex-1 mr-2"
            onChangeText={onChangePassword}
          />
          <Feather
            size={16}
            backgroundColor="white"
            name={toggle ? "eye" : "eye-off"}
            color="#8E8E8E"
            onPress={() => setToggle(!toggle)}
          />
        </View>
        <View className="justify-end w-full flex-row mb-6 mt-4">
          <Text className="text-primary font-medium text-xs text-end">
            Quên mật khẩu?
          </Text>
        </View>
        <TouchableOpacity
          className="bg-primary py-4 block w-full rounded-lg items-center"
          onPress={handleLogin}
          disabled={loading}
        >
          {!loading ? (
            <Text className="text-white text-sm font-medium">Đăng nhập</Text>
          ) : (
            <ActivityIndicator size={20} color="#fff" />
          )}
        </TouchableOpacity>
        <View className="justify-end items-center flex-1">
          <Text className="text-gray-400">
            Bạn chưa có tài khoản?
            <Text className="font-bold text-sm text-primary"> Đăng ký</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
