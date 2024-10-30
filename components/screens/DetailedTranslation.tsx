import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../styles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Translation } from "../models";

type RouteParams = {
  translation: Translation;
};

export const DetailedTranslation = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const { translation } = route.params;

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
        <Text style={styles.value}>{translation.date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Source Text</Text>
        <Text style={styles.value}>{translation.sourceText}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Translated Text</Text>
        <Text style={styles.value}>{translation.targetText}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Context & Breakdown</Text>
        <Text style={styles.value}>{translation.context}</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginVertical: 20,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: colors.lightGray,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    color: colors.white,
    marginTop: 5,
  },
});
