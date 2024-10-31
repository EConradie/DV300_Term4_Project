import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  Animated,
  Easing,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { handleLogin } from "../../../services/authService";
import { User } from "../../../components/models";

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isVisible, onClose }: LoginModalProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    handleLogin({ email, password });
    setLoadingSubmit(true);
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={LoginStyles.modalBackground}>
        <View style={LoginStyles.modalContainer}>
          {/* EMAIL INPUT */}
          <View style={InputStyle.container}>
            <Ionicons
              name="mail-outline"
              size={24}
              color={colors.icon}
              style={InputStyle.Icon}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="black"
              onChangeText={(newText) => setEmail(newText)}
              style={InputStyle.input}
            />
          </View>

          {/* PASSWORD INPUT */}
          <View style={InputStyle.container}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color={colors.icon}
              style={InputStyle.Icon}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              autoCorrect={false}
              placeholderTextColor="black"
              onChangeText={(newText) => setPassword(newText)}
              style={InputStyle.input}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={InputStyle.eyeIcon}
            >
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color={colors.icon}
              />
            </TouchableOpacity>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={LoginStyles.button} onPress={login}>
            {loadingSubmit ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={LoginStyles.buttonText}>LOG IN</Text>
            )}
          </TouchableOpacity>

          {/* UNDERLINE */}
          <View style={LoginStyles.underline}>
            <Text style={LoginStyles.underlineText}>
              Don't have an account?
            </Text>
            <Pressable onPress={() => onClose()}>
              <Text style={LoginStyles.underlineButtonText}>Sign up.</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const InputStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    width: 350,
    borderRadius: 15,
    color: colors.black,
    backgroundColor: colors.lightGray,
    gap: 20,
    paddingLeft: 20,
  },
  Icon: {},
  input: {
    color: colors.black,
    alignSelf: "center",
    width: 350,
    height: "100%",
    position: "absolute",
    paddingLeft: 65,
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
  },
});

const LoginStyles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    gap: 20,
  },
  modalBackground: {
    marginTop: 250,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  text: {
    color: colors.white,
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: 50,
    marginTop: 110,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 60,
    borderRadius: 15,
    backgroundColor: colors.black,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    letterSpacing: 0.5,
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
    color: colors.black,
    fontSize: 16,
  },
  underlineButtonText: {
    color: colors.blue,
    fontSize: 16,
  },
});
