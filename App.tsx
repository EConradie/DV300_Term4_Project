import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RegisterScreen } from "./components/screens/auth/RegisterScreen";
import { TranslateScreen } from "./components/screens/TranslateScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import an icon library
import { colors } from "./components/styles";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Drawer.Navigator
        initialRouteName="Translate"
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.black,
            elevation: 0, 
            shadowOpacity: 0, 
            borderBottomWidth: 0, 
          },
          headerTintColor: colors.white,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color="white" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen name="Translate" component={TranslateScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
