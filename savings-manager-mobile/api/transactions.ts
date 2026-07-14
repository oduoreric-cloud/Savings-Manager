import api from "./axios";

export const getTransactions = async () => {
  const res = await api.get("/api/transactions");
  return res.data?.transactions || res.data || [];
};