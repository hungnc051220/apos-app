import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";
import OrderReportScreen from "../screens/OrderReportScreen";
import RevenueScreen from "../screens/RevenueScreen";

const Tab = createMaterialTopTabNavigator();

const MyTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Revenue"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
        },
        tabBarLabelStyle: { textTransform: "none" },
        tabBarIndicatorStyle: {
          backgroundColor: "#2DB894",
        },
      }}
    >
      <Tab.Screen
        name="Revenue"
        component={RevenueScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#2DB894" : "#353535",
                fontWeight: "500",
              }}
            >
              Doanh thu
            </Text>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="OrderReport"
        component={OrderReportScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#2DB894" : "#353535",
                fontWeight: "500",
              }}
            >
              Đơn hàng
            </Text>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MyTab;
