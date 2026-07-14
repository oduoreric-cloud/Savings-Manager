import { useEffect, useState } from "react";
import {
  getGoals,
  createGoal,
} from "../api/goals";

import GoalCard from "./GoalCard";


function SavingGoals({ darkMode }) {

  const [goals, setGoals] = useState([]);

  const [form, setForm] = useState({
    title: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });


  const loadGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.error(
        "Failed loading goals:",
        error
      );
    }
  };


  useEffect(() => {
    loadGoals();
  }, []);



  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      await createGoal({
        title: form.title,
        targetAmount: Number(form.targetAmount),
        category: form.category || "Other",
        deadline: form.deadline || null,
      });


      setForm({
        title: "",
        targetAmount: "",
        category: "",
        deadline: "",
      });


      loadGoals();


    } catch (error) {

      console.error(
        "Create goal error:",
        error
      );

    }
  };



  return (

    <div
      className={`mt-8 p-5 rounded-xl shadow ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-900"
      }`}
    >

      <h2 className="text-2xl font-bold mb-5">
        🎯 Saving Goals
      </h2>



      {/* Create Goal */}

      <form
        onSubmit={handleSubmit}
        className="space-y-3 mb-8"
      >

        <input
          type="text"
          name="title"
          placeholder="Goal name (Laptop, Car, Trip...)"
          value={form.title}
          onChange={handleChange}
          required
          className={`w-full p-3 rounded-lg border ${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-white"
          }`}
        />


        <input
          type="number"
          name="targetAmount"
          placeholder="Target amount"
          value={form.targetAmount}
          onChange={handleChange}
          required
          className={`w-full p-3 rounded-lg border ${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-white"
          }`}
        />



        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-white"
          }`}
        >

          <option value="">
            Select Category
          </option>

          <option value="Education">
            📚 Education
          </option>

          <option value="Technology">
            💻 Technology
          </option>

          <option value="Travel">
            ✈️ Travel
          </option>

          <option value="Emergency">
            🚨 Emergency
          </option>

          <option value="Other">
            Other
          </option>

        </select>



        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-white"
          }`}
        />



        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg w-full"
        >
          Create Goal 🎯
        </button>


      </form>




      {/* Goals List */}


      {
        goals.length === 0 ? (

          <p className="opacity-70 italic">
            No goals yet. Start planning your future 🚀
          </p>

        ) : (

          goals.map((goal) => (

            <GoalCard
              key={goal._id}
              goal={goal}
              darkMode={darkMode}
              reloadGoals={loadGoals}
            />

          ))

        )
      }


    </div>

  );
}


export default SavingGoals;