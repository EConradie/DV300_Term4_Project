import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { Translation } from "../models";

export const SavedTranslations = () => {
  const navigation = useNavigation();
  const [savedTranslations, setSavedTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    const loadSavedTranslations = async () => {
      const storedTranslations : Translation[] = [
        {
          id: "1",
          sourceLanguage: "English",
          targetLanguage: "Spanish",
          sourceText: "Hello",
          targetText: "Hola",
          date: "2023-11-05",
          context: "This is a test translation",
        },
      ];
      setSavedTranslations(storedTranslations);
    };
    loadSavedTranslations();
  }, []);

  const renderItem = ({ item }: { item: Translation }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DetailedTranslation", { translation: item })
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.languageText}>
          {item.sourceLanguage} ➔ {item.targetLanguage}
        </Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <Text style={styles.translationText}>
        {item.sourceText} ➔ {item.targetText}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Translations</Text>
      <FlatList
        data={savedTranslations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginVertical: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  languageText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: colors.lightGray,
  },
  translationText: {
    fontSize: 16,
    color: colors.white,
    marginTop: 5,
  },
});
