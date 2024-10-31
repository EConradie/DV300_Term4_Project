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
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles";
import { translateText } from "../../services/translateService";
import { languages } from "../languages";
import { playAudio } from "../../services/ttsService";
import { RecordModal } from "../modals/RecordModal";
import { sendToChatGPT } from "../../services/chatGPTService";
import { LanguageModal } from "../modals/LanguageModal";
import { saveTranslation } from "../../services/dbService";
import { auth } from "../../config/firebase";
import { Translation } from "../models";

interface renderLanguageModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectLanguage: (language: { name: string; code: string }) => void;
}

export const TranslateScreen = () => {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [chatGPTResponse, setChatGPTResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [sourceLanguage, setSourceLanguage] = useState({
    name: "English",
    code: "en",
  });
  const [targetLanguage, setTargetLanguage] = useState({
    name: "Spanish",
    code: "es",
  });

  // Modal state
  const [isSourceLanguageModalVisible, setSourceLanguageModalVisible] =
    useState(false);
  const [isTargetLanguageModalVisible, setTargetLanguageModalVisible] =
    useState(false);
  const [isRecordingModalVisible, setRecordingModalVisible] = useState(false);

  // Translate the text
  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setTargetText("");
      setChatGPTResponse("");
      return;
    }

    setLoading(true);
    setSaved(false);

    try {
      const translatedText = await translateText(
        sourceText,
        sourceLanguage.code,
        targetLanguage.code
      );
      setTargetText(translatedText);

      const response = await sendToChatGPT(sourceText, translatedText);
      setChatGPTResponse(response);
    } catch (error) {
      console.error("Error during translation:", error);
      setTargetText("Translation failed. Please try again.");
      setChatGPTResponse("Failed to generate breakdown.");
    } finally {
      setLoading(false);
    }
  };

  // Save the translation
  const handleSaveTranslation = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    if (!sourceText.trim() || !targetText.trim()) {
      alert("Please do a translating before saving.");
      return;
    }

    setSaveLoading(true);

    const translation: Translation = {
      sourceLanguage: sourceLanguage.name,
      targetLanguage: targetLanguage.name,
      sourceText,
      targetText,
      context: chatGPTResponse,
      date: new Date().toISOString(),
    };

    try {
      await saveTranslation(userId, translation);
      setSaved(true);
    } catch (error) {
      alert("Failed to save translation.");
    } finally {
      setSaveLoading(false);
    }
  };

  //Set source text
  const handleSetSourceText = (text: string) => {
    setSourceText(text);
  };

  // Play Audio
  const handlePlayAudio = async (
    text: string,
    language: { name: string; code: string }
  ) => {
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
              <Text style={styles.languageSelectorText}>
                {sourceLanguage.name}
              </Text>
            </TouchableOpacity>

            {/* Swap Icon */}
            <TouchableOpacity onPress={swapLanguages} style={styles.swapIcon}>
              <Ionicons
                name="swap-horizontal-outline"
                size={32}
                color={colors.white}
              />
            </TouchableOpacity>

            {/* Target Language Selector */}
            <TouchableOpacity
              onPress={() => setTargetLanguageModalVisible(true)}
              style={styles.languageSelector}
            >
              <Text style={styles.languageSelectorText}>
                {targetLanguage.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input and Translation Comparison Section */}
        <ScrollView style={styles.inputSection}>
          {/* Source Language Input */}
          <View style={styles.inputContainer}>
            <View style={styles.languageContainer}>
              <Text style={styles.languageLabel}>{sourceLanguage.name}</Text>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Type here..."
                placeholderTextColor={colors.gray}
                multiline={true}
                value={sourceText}
                onChangeText={setSourceText}
                style={styles.textInput}
              />
            </View>

            {/* Text Controls */}
            <View style={styles.textControls}>
              <TouchableOpacity onPress={() => setRecordingModalVisible(true)}>
                <Ionicons name="mic-outline" size={24} color={colors.white} />
              </TouchableOpacity>

              <RecordModal
                isVisible={isRecordingModalVisible}
                onClose={() => setRecordingModalVisible(false)}
                onTranscriptionComplete={handleSetSourceText}
                languageCode={sourceLanguage.code}
              />

              <TouchableOpacity
                onPress={() => handlePlayAudio(sourceText, sourceLanguage)}
              >
                <Ionicons
                  name="volume-high-outline"
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="copy-outline" size={24} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSourceText("")}>
                <MaterialIcons name="clear" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Swap Icon */}
          <View style={styles.swapContainer}>
            <TouchableOpacity onPress={swapLanguages} style={styles.swapButton}>
              <Ionicons
                name="swap-vertical-outline"
                size={32}
                color={colors.white}
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
                placeholderTextColor={colors.gray}
                multiline={true}
                value={targetText}
                onChangeText={setTargetText}
                style={styles.textInput}
              />
            </View>

            {/* Text Controls */}
            <View style={styles.textControls}>
              <TouchableOpacity
                onPress={() => handlePlayAudio(targetText, targetLanguage)}
              >
                <Ionicons
                  name="volume-high-outline"
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="copy-outline" size={24} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTargetText("")}>
                <MaterialIcons name="clear" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Translate/Save Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.translateButton}
              onPress={handleTranslate}
            >
              <Text style={styles.translateButtonText}>Translate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, saved && styles.savedButton]}
              onPress={handleSaveTranslation}
              disabled={saveLoading}
            >
              {saveLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : saved ? (
                <Text style={styles.saveButtonText}>Saved ✓</Text>
              ) : (
                <Text style={styles.saveButtonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Word Context and Breakdown Section */}
          <View style={styles.contextSection}>
            <Text style={styles.contextTitle}>Detailed Word Breakdown</Text>
            <View style={styles.contextCard}>
              {loading ? (
                <ActivityIndicator size="small" color={colors.blue} />
              ) : (
                <Text style={styles.contextText}>
                  {chatGPTResponse || "No detailed breakdown available."}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Source Language Modal */}
        <LanguageModal
          isVisible={isSourceLanguageModalVisible}
          onClose={() => setSourceLanguageModalVisible(false)}
          onSelectLanguage={setSourceLanguage}
          languages={languages}
        />

        {/* Target Language Modal */}
        <LanguageModal
          isVisible={isTargetLanguageModalVisible}
          onClose={() => setTargetLanguageModalVisible(false)}
          onSelectLanguage={setTargetLanguage}
          languages={languages}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  languageSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  languageSelector: {
    backgroundColor: colors.darkGray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  languageSelectorText: {
    color: colors.white,
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
    backgroundColor: colors.darkGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  languageLabel: {
    fontSize: 16,
    color: colors.lightGray,
  },
  textControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    padding: 15,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  swapContainer: {
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: colors.darkGray,
    borderRadius: 10,
  },
  swapButton: {
    padding: 10,
    borderRadius: 50,
  },
  translateButton: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 5,
  },
  translateButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  contextSection: {
    flex: 1,
    backgroundColor: colors.black,
  },
  contextTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
    marginTop: 20,
  },
  contextCard: {
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  contextText: {
    fontSize: 16,
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.tintGray,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 5,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  savedButton: {
    backgroundColor: colors.darkGray,
  },
});
