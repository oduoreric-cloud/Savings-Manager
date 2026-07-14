import React from "react";
import { View, Text } from "react-native";

type Props = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export default function SummaryCards({
  totalIncome,
  totalExpense,
  balance,
}: Props) {
  return (
    <View style={{ marginVertical: 20 }}>
      <Text>Income: ${totalIncome}</Text>
      <Text>Expense: ${totalExpense}</Text>
      <Text>Balance: ${balance}</Text>
    </View>
  );
}