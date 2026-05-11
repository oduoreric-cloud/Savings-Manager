import api from "./axios";

export const getTransactions = async () => {
  const res = await api.get("/api/transactions");
  return res.data;
};

export const createTransaction = async (data) => {
  const res = await api.post("/api/transactions", data);
  return res.data;
};