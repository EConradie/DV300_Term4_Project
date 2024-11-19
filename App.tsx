import React, { useEffect, useState } from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentComponentProps } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./components/styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import { RegisterScreen } from "./components/screens/auth/RegisterScreen";
import { TranslateScreen } from "./components/screens/TranslateScreen";
import { SavedTranslations } from "./components/screens/SavedTranslations";
import { DetailedTranslation } from "./components/screens/DetailedTranslation";

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
        initialParams={{ translation: undefined }}
      />
    </Stack.Navigator>
  );
}

//Drawer Content Component
function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Translate")}
        style={styles.drawerItem}
      >
        <Text style={styles.drawerItemText}>Translate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Saved Translations")}
        style={styles.drawerItem}
      >
        <Text style={styles.drawerItemText}>Saved Translations</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.red} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Translate"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
  );
}

// Auth Stack (for Login/Register screens)
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
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

  return (
    <NavigationContainer theme={DarkTheme}>
      {isLoggedIn ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerItem: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10,
  },
  drawerItemText: {
    fontSize: 16,
    color: colors.white,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.darkGray,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  logoutText: {
    color: colors.red,
    fontSize: 16,
    marginLeft: 10,
  },
});
