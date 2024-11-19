// Updated DetailedTranslation.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../styles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Translation } from "../models";
import RenderContext from "../RenderContext"; // Import the new component

type RootStackParamList = {
  DetailedTranslation: { translation: Translation };
};

export const DetailedTranslation = () => {
  const route = useRoute<RouteProp<RootStackParamList, "DetailedTranslation">>();
  const { translation } = route.params;

  const formattedDate = new Date(translation.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = new Date(translation.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Translation Details</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Languages</Text>
        <Text style={styles.value}>
          {translation.sourceLanguage} ➔ {translation.targetLanguage}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.dateValue}>
          {formattedDate} at {formattedTime}
        </Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.label}>Source Text</Text>
        <Text style={styles.textBox}>{translation.sourceText}</Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.label}>Translated Text</Text>
        <Text style={styles.textBox}>{translation.targetText}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Context & Breakdown</Text>
        <RenderContext context={translation.context || ""} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    marginVertical: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionBox: {
    marginBottom: 20,
    backgroundColor: colors.darkGray,
    padding: 15,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: colors.lightGray,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "500",
  },
  dateValue: {
    fontSize: 16,
    color: colors.lightGray,
    fontStyle: "italic",
  },
  textBox: {
    fontSize: 18,
    color: colors.white,
    backgroundColor: colors.black,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
