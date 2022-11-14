import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import RootScreen from "./screens/RootScreen";
import Toast, { BaseToast } from "react-native-toast-message";
import { StyleSheet, Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import OrderList from "./screens/OrderList";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from "react";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import EmployeeScreen from "./screens/EmployeeScreen";
import StoreScreen from "./screens/StoreScreen";
import BankAccountScreen from "./screens/BankAccountScreen";

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

const toastConfig = {
  success: (props) => (
    <View className="w-4/5 my-2 rounded-lg flex-row overflow-hidden justify-between bg-green-100">
      <View className="bg-green-500 w-1 h-full"></View>
      <View className="pl-2 items-center justify-center">
      <AntDesign name="checkcircle" size={24} color="green" />
      </View>
      <View className="py-2 px-3 flex-1">
        <Text className="font-bold">{props.text1}</Text>
        <Text className="text-xs">{props.text2}</Text>
      </View>
    </View>
  ),
  error: (props) => (
    <View className="w-4/5 my-2 rounded-lg flex-row overflow-hidden justify-between bg-red-50">
      <View className="bg-red-500 w-1 h-full"></View>
      <View className="pl-2 items-center justify-center">
      <AntDesign name="closecircle" size={24} color="red" />
      </View>
      <View className="py-2 px-3 flex-1">
        <Text className="font-bold">{props.text1}</Text>
        <Text className="text-xs">{props.text2}</Text>
      </View>
    </View>
  ),
};

const RootNavigation = () => {
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          {!token ? (
            <Stack.Screen name="Login" component={SignInScreen} />
          ) : (
            <>
              <Stack.Screen name="Root" component={RootScreen} />
              <Stack.Screen name="OrderList" component={OrderList} />
              <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
              <Stack.Screen name="Employees" component={EmployeeScreen} />
              <Stack.Screen name="Stores" component={StoreScreen} />
              <Stack.Screen name="BankAccount" component={BankAccountScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
