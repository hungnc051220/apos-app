import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReportScreen from "../screens/ReportScreen";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View
      style={{
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: "#2DB894",
        ...styles.shadow,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: "#fff",
        borderRadius: 16,
        height: 80,
        ...styles.shadow,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign
              name="home"
              size={24}
              color={focused ? "#2DB894" : "#8E8E8E"}
            />
            <Text
              style={{ fontSize: 12, color: focused ? "#2DB894" : "#8E8E8E", fontWeight: "700" }}
            >
              Trang chủ
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Order"
      component={OrderScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign
              name="filetext1"
              size={24}
              color={focused ? "#2DB894" : "#8E8E8E"}
            />
            <Text
              style={{ fontSize: 12, color: focused ? "#2DB894" : "#8E8E8E", fontWeight: "700" }}
            >
              Đơn bàn
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Menu"
      component={MenuScreen}
      options={{
        tabBarIcon: () => (
          <AntDesign
            name="appstore-o"
            size={30}
            color="#fff"
          />
        ),
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Report"
      component={ReportScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
             <AntDesign
              name="barschart"
              size={24}
              color={focused ? "#2DB894" : "#8E8E8E"}
            />
            <Text
              style={{ fontSize: 12, color: focused ? "#2DB894" : "#8E8E8E", fontWeight: "700" }}
            >
              Báo cáo
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
             <AntDesign
              name="user"
              size={24}
              color={focused ? "#2DB894" : "#8E8E8E"}
            />
            <Text
              style={{ fontSize: 12, color: focused ? "#2DB894" : "#8E8E8E", fontWeight: "700" }}
            >
              Cá nhân
            </Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#2DB894",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
