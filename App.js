import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import RootScreen from "./screens/RootScreen";

const Stack = createStackNavigator();

const RootNavigation = () => {
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        {!token ? (
          <Stack.Screen name="Login" component={SignInScreen} />
        ) : (
          <Stack.Screen name="Root" component={RootScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
