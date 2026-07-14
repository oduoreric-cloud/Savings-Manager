import React from "react";
import { View, Text, Pressable } from "react-native";

type Props = {
  reload?: () => void;
};

export default function AddTransaction({ reload }: Props) {
  return (
    <View>
      <Text>Add Transaction (placeholder)</Text>

      <Pressable
        onPress={() => reload?.()}
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: "blue",
        }}
      >
        <Text style={{ color: "white" }}>Refresh</Text>
      </Pressable>
    </View>
  );
}