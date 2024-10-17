import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../Styles";
import { translateText } from "../../services/translateService";
import { languages } from "../languages";
import { playAudio } from "../../services/ttsService";

interface renderLanguageModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectLanguage: (language: { name: string, code: string }) => void;
}

export const TranslateScreen = () => {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");

  const [sourceLanguage, setSourceLanguage] = useState({ name: "English", code: "en" });
  const [targetLanguage, setTargetLanguage] = useState({ name: "Spanish", code: "es" });

  // Modal state
  const [isSourceLanguageModalVisible, setSourceLanguageModalVisible] =
    useState(false);
  const [isTargetLanguageModalVisible, setTargetLanguageModalVisible] =
    useState(false);

  // Translate the text
  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setTargetText("");
      return;
    }

    try {
      const translatedText = await translateText(sourceText, sourceLanguage.code, targetLanguage.code);
      setTargetText(translatedText); 
    } catch (error) {
      console.error("Error during translation:", error);
      setTargetText("Translation failed. Please try again.");
      console.log(sourceText, sourceLanguage.code, targetLanguage.code);
    }
  };

  // Play Audio
  const handlePlayAudio = async (text: string, language: { name: string, code: string }) => {
    if (!text.trim()) {
      return;
    }

    try {
      await playAudio(text, language.code);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  // Swap Languages
  const swapLanguages = () => {
    const tempText = sourceText;
    setSourceText(targetText);
    setTargetText(tempText);

    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
  };

  // Render Modal Language Selector
  const renderLanguageModal = ({
    isVisible,
    onClose,
    onSelectLanguage,
  }: renderLanguageModalProps) => (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Language</Text>
          <FlatList
            data={languages}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.languageItem}
                onPress={() => {
                  onSelectLanguage(item);
                  onClose();
                }}
              >
                <Text style={styles.languageText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Terpreter</Text>

          {/* Language Selectors with Swap */}
          <View style={styles.languageSelectorContainer}>
            {/* Source Language Selector */}
            <TouchableOpacity
              onPress={() => setSourceLanguageModalVisible(true)}
              style={styles.languageSelector}
            >
              <Text style={styles.languageSelectorText}>{sourceLanguage.name}</Text>
            </TouchableOpacity>

            {/* Swap Icon */}
            <TouchableOpacity onPress={swapLanguages} style={styles.swapIcon}>
              <Ionicons
                name="swap-horizontal-outline"
                size={32}
                color={Colors.white}
              />
            </TouchableOpacity>

            {/* Target Language Selector */}
            <TouchableOpacity
              onPress={() => setTargetLanguageModalVisible(true)}
              style={styles.languageSelector}
            >
              <Text style={styles.languageSelectorText}>{targetLanguage.name}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input and Translation Comparison Section */}
        <View style={styles.inputSection}>
          {/* Source Language Input */}
          <View style={styles.inputContainer}>
            <View style={styles.languageContainer}>
              <Text style={styles.languageLabel}>{sourceLanguage.name}</Text>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Type here..."
                placeholderTextColor={Colors.gray}
                multiline={true}
                value={sourceText}
                onChangeText={setSourceText}
                style={styles.textInput}
              />
            </View>

            {/* Text Controls */}
            <View style={styles.textControls}>
              <TouchableOpacity>
                <Ionicons name="mic-outline" size={24} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePlayAudio(sourceText, sourceLanguage)}>
                <Ionicons
                  name="volume-high-outline"
                  size={24}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="copy-outline" size={24} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSourceText("")}>
                <MaterialIcons name="clear" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Swap Icon */}
          <View style={styles.swapContainer}>
            <TouchableOpacity onPress={swapLanguages} style={styles.swapButton}>
              <Ionicons
                name="swap-vertical-outline"
                size={32}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>

          {/* Target Language Input */}
          <View style={styles.inputContainer}>
            <View style={styles.languageContainer}>
              <Text style={styles.languageLabel}>{targetLanguage.name}</Text>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Type here..."
                placeholderTextColor={Colors.gray}
                multiline={true}
                value={targetText}
                onChangeText={setTargetText}
                style={styles.textInput}
              />
            </View>

            {/* Text Controls */}
            <View style={styles.textControls}>
              <TouchableOpacity onPress={() => handlePlayAudio(targetText, targetLanguage)}>
                <Ionicons
                  name="volume-high-outline"
                  size={24}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="copy-outline" size={24} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTargetText("")}>
                <MaterialIcons name="clear" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Translate Button */}
        <TouchableOpacity
          style={styles.translateButton}
          onPress={handleTranslate}
        >
          <Text style={styles.translateButtonText}>Translate</Text>
        </TouchableOpacity>

        {/* Modals for selecting languages */}
        {renderLanguageModal({
          isVisible: isSourceLanguageModalVisible,
          onClose: () => setSourceLanguageModalVisible(false),
          onSelectLanguage: (language) => setSourceLanguage(language),
        })}
        {renderLanguageModal({
          isVisible: isTargetLanguageModalVisible,
          onClose: () => setTargetLanguageModalVisible(false),
          onSelectLanguage: (language) => setTargetLanguage(language),
        })}

        {/* Word Context and Breakdown Section */}
        <ScrollView style={styles.contextSection}>
          <Text style={styles.contextTitle}>Detailed Word Breakdown</Text>
          <View style={styles.contextCard}>
            <Text style={styles.contextText}>
              Word: Lorem Ipsum - A detailed explanation of this word in various
              contexts and its meanings in both languages.
            </Text>
          </View>

          <View style={styles.contextCard}>
            <Text style={styles.contextText}>
              Word: Dolor Sit Amet - An AI-generated breakdown of its usage,
              with examples in both languages.
            </Text>
          </View>
          {/* Add more breakdowns dynamically in the future */}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },
  languageSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  languageSelector: {
    backgroundColor: Colors.darkGray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  languageSelectorText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  swapIcon: {
    marginHorizontal: 10,
  },
  inputSection: {
    flex: 1,
    marginBottom: 50,
  },
  inputContainer: {
    marginVertical: 5,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.darkGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    color: Colors.white,
    fontSize: 16,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.darkGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  languageLabel: {
    fontSize: 16,
    color: Colors.lightGray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: Colors.darkGray,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.white,
  },
  languageItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  languageText: {
    fontSize: 18,
    color: Colors.white,
  },
  textControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.darkGray,
    borderRadius: 10,
    padding: 15,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  swapContainer: {
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: Colors.darkGray,
    borderRadius: 10,
  },
  swapButton: {
    padding: 10,
    borderRadius: 50,
  },
  translateButton: {
    backgroundColor: Colors.blue,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  translateButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  contextSection: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  contextTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 10,
    marginTop: 10,
  },
  contextCard: {
    backgroundColor: Colors.darkGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  contextText: {
    fontSize: 16,
    color: Colors.white,
  },
});
