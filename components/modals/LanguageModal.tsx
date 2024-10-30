import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { colors } from "../styles";

interface Language {
  name: string;
  code: string;
}

interface LanguageModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectLanguage: (language: Language) => void;
  languages: Language[];
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isVisible,
  onClose,
  onSelectLanguage,
  languages,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Language</Text>

          <TextInput
            placeholder="Search language..."
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          <FlatList
            data={filteredLanguages}
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
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 150,
    paddingHorizontal: 20,
    paddingBottom: 300,
  },
  modalContent: {
    backgroundColor: colors.darkGray,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.white,
  },
  searchInput: {
    backgroundColor: colors.black,
    color: colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  languageItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  languageText: {
    fontSize: 18,
    color: colors.white,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.tintGray,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
