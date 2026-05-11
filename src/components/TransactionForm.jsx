import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.description || !form.amount) return;

    onAdd({
      ...form,
      amount: Number(form.amount),
      id: Date.now(),
    });

    setForm({ description: "", amount: "", type: "expense" });
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto border">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Amount */}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

