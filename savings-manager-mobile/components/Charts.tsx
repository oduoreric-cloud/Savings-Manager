import React from "react";
import { View, Text } from "react-native";

type Props = {
  transactions?: any[];
  darkMode?: boolean;
};

export default function Charts({
  transactions,
  darkMode,
}: Props) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text>
        Charts coming soon 📊 ({transactions?.length || 0} transactions)
      </Text>
    </View>
  );
}