import { useState } from "react";
import {
  depositGoal,
  withdrawGoal,
  deleteGoal,
} from "../api/goals";

function GoalCard({ goal, reloadGoals, darkMode }) {
  const [amount, setAmount] = useState("");

  const percentage = Math.min(
    (goal.currentAmount / goal.targetAmount) * 100,
    100
  );

  const remaining = Math.max(
    goal.targetAmount - goal.currentAmount,
    0
  );

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) return;

    try {
      await depositGoal(goal._id, Number(amount));
      setAmount("");
      reloadGoals();
    } catch (err) {
      console.error(err);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) return;

    try {
      await withdrawGoal(goal._id, Number(amount));
      setAmount("");
      reloadGoals();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this goal?"
    );

    if (!confirmed) return;

    try {
      await deleteGoal(goal._id);
      reloadGoals();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`rounded-xl shadow-lg p-5 mb-5 transition ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          🎯 {goal.title}
        </h2>

        {goal.completed && (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            Completed
          </span>
        )}
      </div>

      <p className="mt-3">
        <strong>Saved:</strong>

        {" "}KSh {goal.currentAmount.toLocaleString()}
      </p>

      <p>
        <strong>Target:</strong>

        {" "}KSh {goal.targetAmount.toLocaleString()}
      </p>

      <p>
        <strong>Remaining:</strong>

        {" "}KSh {remaining.toLocaleString()}
      </p>

      {goal.deadline && (
        <p className="mt-2 text-sm opacity-80">
          📅 {new Date(goal.deadline).toLocaleDateString()}
        </p>
      )}

      <div className="w-full bg-gray-300 rounded-full h-4 mt-5 overflow-hidden">
        <div
          className={`h-4 transition-all duration-500 ${
            percentage >= 100
              ? "bg-green-600"
              : percentage >= 70
              ? "bg-yellow-500"
              : "bg-blue-600"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-2 font-semibold">
        {percentage.toFixed(1)}%
      </p>

      <div className="flex gap-2 mt-5">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className={`flex-1 border rounded-lg p-2 ${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-white"
          }`}
        />

        <button
          onClick={handleDeposit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg"
        >
          +
        </button>

        <button
          onClick={handleWithdraw}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 rounded-lg"
        >
          -
        </button>
      </div>

      <button
        onClick={handleDelete}
        className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
      >
        Delete Goal
      </button>
    </div>
  );
}

export default GoalCard;