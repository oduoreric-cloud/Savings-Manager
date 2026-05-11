import { useState } from "react";
import { createTransaction } from "../api/transactions";

function AddTransaction({ reload, darkMode }) {

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    date: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending transaction:", form);

    try {

     const newTransaction = await createTransaction({
        note: form.note,
        amount: Number(form.amount),
        type: form.type,
        date: form.date,
        category: form.category || "Other"
      });

      alert("Transaction added");

      setForm({
        note: "",
        amount: "",
        type: "expense",
        date: "",
        category: ""
      });

      reload(newTransaction);

    } catch (error) {
      console.error("FULL ERROR:", error.response?.data);
    }
  };

  return (

    <form
      onSubmit={handleSubmit} 
      className={`mb-6 space-y-2 ${darkMode ? "text-white" : "text-gray-900"}`}>

      <input
        type="text"
        name="note"
        placeholder="Note"
        value={form.note}
        onChange={handleChange}
        className={`border p-2 w-full rounded-lg ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className={`border p-2 w-full rounded-lg ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
        required
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className={`border p-2 w-full rounded-lg ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className={`border p-2 w-full rounded-lg ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className={`border p-2 w-full rounded-lg ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
        required
      />

      <button
        type="submit"
        className={`bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 transition transform text-white px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
      >
        Add Transaction
      </button>

    </form>
  );
}

export default AddTransaction;