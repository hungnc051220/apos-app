import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import AddFloor from "../components/AddFloor";
import AddFood from "../components/AddFood";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import MyTab from "../navigation/TopBarNavigation";

const ReportScreen = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);
  const [foods, setFoods] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const getFoods = async () => {
    setRefreshing(true);
    try {
      const response = await axios.post(
        "https://mseller-dev.azurewebsites.net/api/menu/food/list",
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

  return (
    <View className="flex-1">
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../assets/background-login.png")}
        resizeMode="cover"
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1">
        <Header navigation={navigation} text="Report"/>
        <MyTab />
      </SafeAreaView>
    </View>
  );
};

export default ReportScreen;
