import React, { useState, useMemo } from "react";
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
import { getTranslationsByUser } from "../../services/dbService";
import { auth } from "../../config/firebase";

export const SavedTranslations = () => {
  const navigation = useNavigation();
  const [translations, setTranslations] = useState<Translation[]>([]);

  useMemo(() => {
    const fetchTranslations = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      try {
        const data = await getTranslationsByUser(userId);
        setTranslations(data);
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    };

    fetchTranslations();
  }, [translations]);

  const renderItem = ({ item }: { item: Translation }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DetailedTranslation", { translation: item })
      }
    >
      <Text style={styles.translationText}>
        {item.sourceLanguage} ➔ {item.targetLanguage}
      </Text>
      <Text style={styles.dateText}>
        {new Date(item.date).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Translations</Text>
      <FlatList
        style={styles.list}
        data={translations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || ""}
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
