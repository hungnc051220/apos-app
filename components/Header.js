import { Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

const Header = ({ navigation }) => {
  return (
    <View className="flex-row justify-between items-center pb-4 px-6 pt-[35px]">
      <Feather
        name="chevron-left"
        size={24}
        color="#fff"
        onPress={() => navigation.goBack()}
      />
      <Text className="text-white font-medium text-base">Menu</Text>
      <Feather name="home" size={22} color="#fff" />
    </View>
  );
};

export default Header;
