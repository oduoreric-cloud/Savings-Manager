import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";

import api from "../api/axios";
import { getTransactions } from "../api/transactions";
import SummaryCards from "../components/SummaryCards";
import AddTransaction from "../components/AddTransaction";
import Charts from "../components/Charts";

export default function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // FILTER LOGIC (correct version)
  const visibleTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ? true : t.type === filterType;

    const matchesCategory =
      selectedCategory === "all"
        ? true
        : t.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const income = transactions.filter((t) => t.type === "income");
  const expense = transactions.filter((t) => t.type === "expense");

  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expense.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/api/transactions");
        setTransactions(res.data?.transactions || res.data || []);
      } catch (error) {
        console.log("API error:", error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: darkMode ? "#0f172a" : "#f1f5f9",
      }}
    >
      {/* HEADER */}
      <Text style={{ fontSize: 28, fontWeight: "bold", color: darkMode ? "white" : "black" }}>
        Finance Dashboard
      </Text>

      {/* SUMMARY CARDS */}
        <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
      {/* CHARTS */}
        <Charts transactions={transactions} darkMode={darkMode} />

      {/* SEARCH */}
      <TextInput
        placeholder="Search transactions..."
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{
          marginTop: 20,
          padding: 10,
          borderWidth: 1,
          borderRadius: 8,
          backgroundColor: "white",
        }}
      />

      {/* FILTER BUTTONS */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 15 }}>
        {["all", "income", "expense"].map((type) => (
          <Pressable
            key={type}
            onPress={() => setFilterType(type)}
            style={{
              padding: 8,
              margin: 5,
              backgroundColor: filterType === type ? "#2563eb" : "#e5e7eb",
              borderRadius: 6,
            }}
          >
            <Text style={{ color: filterType === type ? "white" : "black" }}>
              {type}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* CATEGORY FILTERS */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
        {["all", "Food", "Transport", "Entertainment"].map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={{
              padding: 8,
              margin: 5,
              backgroundColor: selectedCategory === cat ? "#10b981" : "#e5e7eb",
              borderRadius: 6,
            }}
          >
            <Text style={{ color: selectedCategory === cat ? "white" : "black" }}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* TRANSACTIONS LIST */}
      <View style={{ marginTop: 20 }}>
        {visibleTransactions.map((t, index) => (
          <View
            key={index}
            style={{
              padding: 12,
              marginBottom: 10,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{t.category}</Text>
            <Text>{t.note}</Text>
            <Text style={{ color: t.type === "income" ? "green" : "red" }}>
              {t.type === "income" ? "+" : "-"}${t.amount}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={() => setShowAddForm(true)}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,  
          
          backgroundColor: "#2563eb",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 30 }}>+</Text>
      </Pressable>

      {showAddForm && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
            <AddTransaction
               reload={() => {
                setShowAddForm(false);
                // Re-fetch transactions after adding a new one
                api.get("/api/transactions").then((res) => {
                  setTransactions(res.data?.transactions || res.data || []);
                });
              }}
            />
              <Pressable onPress={() => setShowAddForm(false)}>
                <Text style={{ textAlign: "center", marginTop: 10 }}>Close</Text>
                
                
              </Pressable>
          </View>
        </View>)}

    </ScrollView>
  );
}