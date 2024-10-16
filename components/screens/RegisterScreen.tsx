import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../Styles";
import { Ionicons } from "@expo/vector-icons";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";

export const RegisterScreen = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalVisible(false);
  };

  const openSignupModal = () => {
    setIsSignupModalVisible(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalVisible(false);
  };

  return (
    <View style={RegisterStyles.background}>
      <View style={RegisterStyles.container}>
        {/* TEXT */}
        <View style={RegisterStyles.textContainer}>
          <Text style={RegisterStyles.titleText}>Get Started!</Text>
          <Text style={RegisterStyles.text}>
            Best place to translate and learn!
          </Text>
        </View>

        {/* LOGO */}
        <View style={RegisterStyles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={RegisterStyles.logo}
          />
        </View>

        {/* BUTTON */}
        <View style={RegisterStyles.buttonContainer}>
          <TouchableOpacity
            style={RegisterStyles.buttonLogin}
            onPress={openLoginModal}
          >
            <Text style={RegisterStyles.buttonTextLogin}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={RegisterStyles.buttonSignup} onPress={openSignupModal}>
            <Text style={RegisterStyles.buttonTextSignup}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Modal */}
      <LoginModal isVisible={isLoginModalVisible} onClose={closeLoginModal} />

      {/* Signup Modal */}
      <SignupModal isVisible={isSignupModalVisible} onClose={closeSignupModal} />

    </View>
  );
};

const RegisterStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    marginTop: 100,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    gap: 20,
  },
  background: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.black,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
    fontWeight: "300",
    fontSize: 20,
    marginBottom: 5,
  },
  titleText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 30,
    marginBottom: 5,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    height: 225,
  },
  logo: {
    width: 220,
    height: 200,
  },
  buttonSignup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 170,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  buttonLogin: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 170,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.black,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  buttonTextLogin: {
    color: Colors.white,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  buttonTextSignup: {
    color: Colors.black,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    alignSelf: "flex-end",
    marginTop: 160,
  },
  underline: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  underlineText: {
    color: Colors.white,
    fontSize: 16,
  },
  underlineButtonText: {
    color: Colors.orange,
    fontSize: 16,
  },
});
