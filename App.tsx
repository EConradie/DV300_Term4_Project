import React, { useEffect, useState } from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { RegisterScreen } from "./components/screens/auth/RegisterScreen";
import { TranslateScreen } from "./components/screens/TranslateScreen";
import { SavedTranslations } from "./components/screens/SavedTranslations";
import { DetailedTranslation } from "./components/screens/DetailedTranslation";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./components/styles";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function TranslateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SavedTranslation"
        component={SavedTranslations}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailedTranslation"
        component={DetailedTranslation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
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
              <Ionicons
                name="menu"
                size={24}
                color="white"
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen name="Translate" component={TranslateScreen} />
        <Drawer.Screen name="Saved Translations" component={TranslateStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return isLoggedIn ? <Navigation /> : <RegisterScreen />;
}
