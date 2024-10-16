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
  TouchableWithoutFeedback
} from "react-native";
import { Colors } from "../../Styles";
import { Ionicons } from "@expo/vector-icons";

interface SignupModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SignupModal = ({ isVisible, onClose }: SignupModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState('');

  const signup = () => {
    setLoadingSubmit(false);
    onClose();
  };

  return (
    
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
    <View style={SignupStyles.modalBackground}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.orange} />
      ) : (
        <View style={SignupStyles.modalContainer}>

          {/* USERNAME INPUT */}
          <View style={InputStyle.container}>
            <Ionicons
              name="person-outline"
              size={24}
              color={Colors.icon}
              style={InputStyle.Icon}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="black"
              onChangeText={(newText) => setUsername(newText)}
              style={InputStyle.input}
            />
          </View>

          {/* EMAIL INPUT */}
          <View style={InputStyle.container}>
            <Ionicons
              name="mail-outline"
              size={24}
              color={Colors.icon}
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
              color={Colors.icon}
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
                color={Colors.icon}
              />
            </TouchableOpacity>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={SignupStyles.button} onPress={signup}>
            {loadingSubmit ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={SignupStyles.buttonText}>SIGN UP</Text>
            )}
          </TouchableOpacity>

          {/* UNDERLINE */}
          <View style={SignupStyles.underline}>
            <Text style={SignupStyles.underlineText}>
                Already have an account?
            </Text>
            <Pressable onPress={() => onClose()}
              >
              <Text style={SignupStyles.underlineButtonText}>Log in.</Text>
            </Pressable>
          </View>
        </View>
      )}
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
    borderRadius: 30,
    color: Colors.black,
    backgroundColor: Colors.lightGray,
    gap: 20,
    paddingLeft: 20,
  },
  Icon: {},
  input: {
    color: Colors.black,
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

const SignupStyles = StyleSheet.create({
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
    backgroundColor: Colors.white,
    borderRadius: 30,
  },
  text: {
    color: Colors.white,
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
    borderRadius: 30,
    backgroundColor: Colors.black,
  },
  buttonText: {
    color: Colors.white,
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
    color: Colors.black,
    fontSize: 16,
  },
  underlineButtonText: {
    color: Colors.blue,
    fontSize: 16,
  },
});