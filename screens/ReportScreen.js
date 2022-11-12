import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ImageBackground, View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import MyTab from "../navigation/TopBarNavigation";

const ReportScreen = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);
  const [foods, setFoods] = useState({});
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

  return (
    <View className="flex-1">
      <StatusBar style="light" translucent={true}/>
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
