import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

const HeaderHome = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <View className="flex-row">
      <View className="flex-row pt-3 px-6 pb-4">
        <Image
          source={require("../assets/icon.png")}
          resizeMode="contain"
          className="h-12 w-12 rounded-full mr-2"
        />
        <View className="justify-center">
          <Text className="text-white">{user?.fullName}</Text>
          <Text className="text-white text-xs">Quản lý</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Text className="font-bold text-base text-white">
          {user?.company.companyName}
        </Text>
      </View>
    </View>
  );
};

export default HeaderHome;
