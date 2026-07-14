import api from "./axios";


// Get recurring transactions
export const getRecurringTransactions = async () => {
  const res = await api.get("/api/recurring");
  return res.data;
};


// Create recurring transaction
export const createRecurringTransaction = async (data) => {
  const res = await api.post("/api/recurring", data);
  return res.data;
};


// Toggle active status
export const toggleRecurringTransaction = async (id) => {
  const res = await api.put(`/api/recurring/${id}/toggle`);
  return res.data;
};


// Delete recurring transaction
export const deleteRecurringTransaction = async (id) => {
  const res = await api.delete(`/api/recurring/${id}`);
  return res.data;
};