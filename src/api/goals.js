import api from "./axios";

// Get all goals
export const getGoals = async () => {
  const res = await api.get("/api/goals");
  return res.data;
};

// Create a goal
export const createGoal = async (goalData) => {
  const res = await api.post("/api/goals", goalData);
  return res.data;
};

// Deposit into a goal
export const depositGoal = async (id, amount) => {
  const res = await api.put(`/api/goals/${id}/deposit`, {
    amount,
  });

  return res.data;
};

// Withdraw from a goal
export const withdrawGoal = async (id, amount) => {
  const res = await api.put(`/api/goals/${id}/withdraw`, {
    amount,
  });

  return res.data;
};

// Delete goal
export const deleteGoal = async (id) => {
  const res = await api.delete(`/api/goals/${id}`);

  return res.data;
};