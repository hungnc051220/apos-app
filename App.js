import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import RootScreen from "./screens/RootScreen";
import Toast, { BaseToast } from "react-native-toast-message";

const Stack = createStackNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      text1Style={{
        fontSize: 14,
        fontWeight: '600',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400'
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red' }}
      text1Style={{
        fontSize: 14,
        fontWeight: '600',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400'
      }}
    />
  ),
}

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
          {token ? (
            <Stack.Screen name="Login" component={SignInScreen} />
          ) : (
            <Stack.Screen name="Root" component={RootScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig}/>
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
