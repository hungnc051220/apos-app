import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidWrapper";

const SignInScreen = () => {
  const [toggle, setToggle] = useState(true);
  const { loading, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống"),
    password: yup.string().required("Mật khẩu không được để trống"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = (data) => dispatch(login(data));

  useEffect(() => {
    if (!isError) return;
    Toast.show({
      type: "error",
      text1: "Đăng nhập thất bại",
      text2: message,
      props: {
        text1NumberOfLines: 2,
      },
    });

    dispatch(reset());
  }, [dispatch, isError, message]);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <ImageBackground
        source={require("../assets/background-login.png")}
        resizeMode="cover"
        className="flex-1 absolute inset-0"
        style={{ height: Dimensions.get("window").height, width: "auto" }}
      />
      <View className="h-1/3 justify-center items-center">
        <View className="h-20 w-20 bg-white rounded-2xl mb-4 items-center justify-center">
          <Image source={require("../assets/logo.png")} resizeMode="cover" />
        </View>
        <Text className="text-white font-semibold text-base">
          Trợ lý đắc lực của cửa hàng
        </Text>
      </View>
      <View className="h-2/3 bg-white p-6 rounded-t-[32px] items-center">
        <Text className="text-2xl leading-7 font-semibold text-primary mb-6">
          Đăng nhập
        </Text>

        <View className="w-full mb-4">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Số điện thoại"
                className={`w-full block border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-200"
                } h-12 px-4 rounded-lg`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <View className="flex-row items-center mt-2">
              <Ionicons name="warning" size={16} color="red" />
              <Text className="text-red-500 self-start ml-1">
                {errors.phoneNumber?.message}
              </Text>
            </View>
          )}
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              className={`flex-row w-full border ${
                errors.password ? "border-red-500" : "border-gray-200"
              } rounded-lg h-12 items-center pl-4`}
            >
              <TextInput
                placeholder="Mật khẩu"
                secureTextEntry={toggle ? true : false}
                className="flex-1 mr-2"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <TouchableOpacity
                className="h-full w-12 justify-center items-center"
                onPress={() => setToggle(!toggle)}
              >
                <Feather
                  size={16}
                  backgroundColor="white"
                  name={toggle ? "eye" : "eye-off"}
                  color="#8E8E8E"
                />
              </TouchableOpacity>
            </View>
          )}
          name="password"
        />
        {errors.password && (
          <View className="flex-row items-center mt-2 self-start">
            <Ionicons name="warning" size={16} color="red" />
            <Text className="text-red-500 self-start ml-1">
              {errors.password?.message}
            </Text>
          </View>
        )}

        <View className="justify-end w-full flex-row mb-6 mt-4">
          <Text className="text-primary font-medium text-xs text-end">
            Quên mật khẩu?
          </Text>
        </View>
        <TouchableOpacity
          className="bg-primary py-4 block w-full rounded-lg items-center"
          onPress={handleSubmit(onSubmit)}
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
