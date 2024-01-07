import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ListUser from "../screens/ListUser";
import ListPost from "../screens/ListPost";
import DetailPost from "../screens/DetailPost";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import DetailUser from "../screens/DetailUser";
import AddPost from "../screens/AddPost";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Post combo
const StackPost = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListPost" component={ListPost} />
      <Stack.Screen name="DetailPost" component={DetailPost} />
    </Stack.Navigator>
  );
};

// User combo
const StackUser = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListUser" component={ListUser} />
      <Stack.Screen name="DetailUser" component={DetailUser} />
    </Stack.Navigator>
  );
};

export default function MainStack() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Post") {
                iconName = focused ? "list" : "list-outline";
              } else if (route.name === "User") {
                iconName = focused ? "people" : "people-outline";
              } else if (route.name === "AddPost") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="AddPost" component={AddPost} />
          {/* Post combo */}
          <Tab.Screen
            options={{
              headerShown: false,
            }}
            name="Post"
            component={StackPost}
          />
          {/* User combo */}
          <Tab.Screen
            options={{
              headerShown: false,
            }}
            name="User"
            component={StackUser}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Register") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Login") {
                iconName = focused ? "log-in" : "log-in-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Register" component={Register} />
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
