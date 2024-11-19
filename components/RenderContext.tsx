import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../components/styles";

type RenderContextProps = {
  context: string;
};

const RenderContext: React.FC<RenderContextProps> = ({ context }) => {
  if (!context) {
    return <Text style={styles.contextValue}>No additional context provided.</Text>;
  }

  return (
    <View>
      {context.split('\n').map((line, index) => {
        if (/^- \*\*(.+?)\*\*/.test(line)) {
          const heading = line.match(/^- \*\*(.+?)\*\*/)?.[1];
          return (
            <Text key={index} style={styles.heading}>
              {heading}
            </Text>
          );
        }
        if (/^\*\*(.+?)\*\*/.test(line)) {
          const boldText = line.match(/^\*\*(.+?)\*\*/)?.[1];
          return (
            <Text key={index} style={styles.boldText}>
              {boldText}
            </Text>
          );
        }
        if (/^- (.+)/.test(line)) {
          const listItem = line.match(/^- (.+)/)?.[1];
          return (
            <Text key={index} style={styles.listItem}>
              • {listItem}
            </Text>
          );
        }
        return (
          <Text key={index} style={styles.contextValue}>
            {line}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginVertical: 10,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    marginVertical: 5,
  },
  listItem: {
    fontSize: 16,
    color: colors.lightGray,
    marginVertical: 3,
  },
  contextValue: {
    fontSize: 16,
    color: colors.lightGray,
    lineHeight: 22,
  },
});

export default RenderContext;
