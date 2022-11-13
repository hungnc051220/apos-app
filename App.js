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

const Stack = createStackNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{
        backgroundColor: "white",
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: "600",
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
      }}
      renderTrailingIcon={() => (
        <View className="w-16 justify-center items-center">
          <AntDesign name="checkcircle" size={24} color="green" />
        </View>
      )}
    />
  ),
  error: (props) => (
    <View className="bg-white w-4/5 my-2 py-2 px-3 rounded-lg flex-row">
      <View className="bg-red-500 w-2 h-full"></View>
      <View>
        <Text className="font-bold">{props.text1}</Text>
        <Text className="text-xs">{props.text2}</Text>
      </View>
    </View>
  ),
};

const RootNavigation = () => {
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  return (
    <>
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
