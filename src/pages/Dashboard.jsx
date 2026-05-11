import { useEffect, useState } from "react";
import api from "../api/axios";
import { getTransactions } from "../api/transactions";
import AddTransaction from "../components/AddTransaction";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";

function Dashboard() {
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning 🌄 "
      : currentHour < 18
      ? "Good afternoon🌤️"
      : "Good evening🌃";

  const todayDate = new Date().toLocaleDateString("en-KE", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });    

  // Load saved budget
  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");

    if (savedBudget) {
      setBudget(Number(savedBudget));
    }
  }, []);

  // Save budget
  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  // Fetch transactions
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

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Reload transactions
  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Reset budget
  const resetBudget = () => {
    setBudget(0);
    localStorage.removeItem("budget");
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = 
      filterType === "all" ? true : t.type === filterType;

      const matchesCategory = 
        selectedCategory === "all" ? true : t.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Filter transactions
  const incomeTransactions = filteredTransactions.filter(
    (t) => t.type === "income"
  );

  const expenseTransactions = filteredTransactions.filter(
    (t) => t.type === "expense"
  );

  // Totals
  const totalIncome = incomeTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const totalExpense = expenseTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const balance = totalIncome - totalExpense;

  // Insight message
  const insight =
    totalExpense > totalIncome
      ? "Your expenses exceed your income. Consider reviewing your spending habits."
      : "Your income exceeds your expenses. Great job managing your finances!";

  // Budget calculations
  const budgetUsage =
    budget > 0 ? (totalExpense / budget) * 100 : 0;
      
  let budgetMessage = "";
  let budgetColor = "text-green-600";

  const savingsRate =
    totalIncome > 0
      ? ((totalIncome - totalExpense) / totalIncome) * 100
      : 0;

  const healthScore = Math.max(
    0,
    Math.min(100, savingsRate + (budgetUsage < 80 ? 20 : 0))
  )    

  if (budgetUsage >= 100) {
    budgetMessage = "🚨 You have exceeded your budget!";
    budgetColor = "text-red-600";
  } else if (budgetUsage >= 80) {
    budgetMessage = "🤏 You are close to reaching your budget.";
    budgetColor = "text-yellow-600";
  } else if (budget > 0) {
    budgetMessage = "👊 Budget is under control.";
  }

  const alerts = [];

    if (budgetUsage >= 80) {
      alerts.push(
        "⚠️ You are approaching your budget limit. Consider reviewing your expenses."
      );
    }
    
    if (savingsRate < 30) {
        alerts.push(
          "🎉 Your savings rate is low. Consider increasing your savings."
        );
    }

    if (expenseTransactions.length > incomeTransactions.length) {
      alerts.push(
        "📉You have more expenses than income. Consider reviewing your spending."
      );
    }

  return (
    <div
      className={`min-h-screen px-3 sm:px-4 md:px-6 py-4 sm:py-6 transition-all duration-300 overflow-x-hidden ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="pb-16">

        {/* Header */}
        <div 
          className={`sticky top-0 z-40 backdrop-blur-md ${
            darkMode
              ? "bg-gray-900/80"
              : "bg-gray-100/80"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center mb-6">

            {/* Left Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Finance Dashboard
              </h2>
              <p className="text-sm sm:text-lg font-medium mt-1">
                {greeting}, {todayDate}
              </p>
            </div>
            {/* Right Section */}
            <div className="flex items-center gap-2">
              
              {/*sidebar toggle button*/}
              <button
                onClick={() => setSidebarOpen(true)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                ☰
              </button>

              
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 z-50 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } ${
              darkMode
               ? "bg-gray-800 text-white"
               : "bg-white text-gray-900"
            } shadow-2xl`}
          >
            <div className="p-5 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖️
              </button>
            </div>
            <div className="flex flex-col p-4 gap-4">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-lg text-left ${
                  darkMode
                    ? "bg-gray-700"
                    : "bg-gray-200"
                }`}
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
              <button
                onClick={logout}
                className={`p-3 rounded-lg text-left ${
                  darkMode
                    ? "bg-gray-700"
                    : "bg-gray-200"
                }`}
              >
                Logout
              </button>
            </div>
          </div>
      </div>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Budget Section */}
      <div
        className={`mb-6 p-4 rounded-xl shadow ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-lg font-bold mb-2">
          Set Monthly Budget
        </h3>

        <input
          type="number"
          placeholder="Enter budget"
          value={budget}
          onChange={(e) =>
            setBudget(Number(e.target.value) || 0)
          }
          className={`border p-2 rounded w-full ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        />

        <p className={`mt-3 font-medium ${budgetColor}`}>
          {budgetMessage}
        </p>


        <button
          onClick={resetBudget}
          className={`mt-3 py-2 px-4 rounded ${
            darkMode
              ? "bg-gray-600 hover:bg-gray-700 text-white"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}
        >
          Reset Budget
        </button>
      </div>

      {budget > 0 && (
        <div className="mt-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>Budget Usage</span>
            <span>{budgetUsage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 transition-all duration-500 ${
                budgetUsage >= 100
                  ? "bg-red-600"
                  : budgetUsage >= 80
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${Math.min(budgetUsage, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Tabs */}
      

      {/* Summary Cards */}
      <SummaryCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      <div className="mt-4 space-y-2">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          >
            <p>{alert}</p>
          </div>
        ))}
      </div>

      {/* Insight */}
      <p
        className={`mt-4 font-semibold text-center ${
          totalExpense > totalIncome
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        {insight}
      </p>

      {/* Health Score */}
      <div
        className={`mt-6 p-4 rounded-xl shadow ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-lg font-bold mb-2">
          Financial Health Score
        </h3>
        <div
          className={`text-3xl font-bold ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {healthScore.toFixed(0)} / 100
        </div>
        <p
          className={`mt-2 text-sm ${
            darkMode 
              ? "text-gray-300" 
              : "text-gray-600"
            }`}
        >
          Based on your savings rate and budget management. Aim for a score above 80 for good financial health!
        </p>
      </div>

      <div className="mb-6 flex flex-col lg:flex-row gap-4">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          <button
             onClick={() => setSelectedCategory("all")}
             className={`px-3 py-1 rounded-full border ${
                selectedCategory === "all"
                  ? "bg-gray-800 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
             } `}
            >
              All
            </button>
            <button
             onClick={() => setSelectedCategory("Food")}
             className={`px-3 py-1 rounded-full border ${
                selectedCategory === "Food"
                  ? "bg-green-800 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
             } `}
            >
              🍔Food
            </button>
            <button
             onClick={() => setSelectedCategory("Transportation")}
             className={`px-3 py-1 rounded-full border ${
                selectedCategory === "Transportation"
                  ? "bg-blue-800 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
             } `}
            >
              🚌Transportation
            </button>
            <button
             onClick={() => setSelectedCategory("Entertainment")}
             className={`px-3 py-1 rounded-full border ${
                selectedCategory === "Entertainment"
                  ? "bg-purple-800 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
             } `}
            >
              🎬Entertainment
            </button>
            <button
             onClick={() => setSelectedCategory("Utilities")}
             className={`px-3 py-1 rounded-full border ${
                selectedCategory === "Utilities"
                  ? "bg-yellow-800 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
             } `}
            >
              💡Utilities
            </button>
            <button
             onClick={() => setSelectedCategory("Health")}
             className={`px-3 py-1 rounded-full border ${
                selectedCategory === "Health"
                  ? "bg-red-800 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
             } `}
            >
              🏥Health
            </button>
            <button
             onClick={() => setSelectedCategory("Education")}
             className={`px-3 py-1 rounded-full border ${
                selectedCategory === "Education"
                  ? "bg-indigo-800 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
             } `}
            >
              📚Education
            </button>
            <button
             onClick={() => setSelectedCategory("Other")}
             className={`px-3 py-1 rounded-full border ${
                selectedCategory === "Other"
                  ? "bg-gray-800 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
             } `}
            >
              🕒Other
            </button>

          </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="mb-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
          >
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div 
        className={`mt-6 overflow-x-auto rounded-xl p-4 shadow ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        <Charts 
          transactions={transactions} 
          darkMode={darkMode}
        />

        {/* Modal for Adding Transaction */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✖️
              </button>
              <AddTransaction
                darkMode={darkMode}
                reload={(newTx) => {
                  if (newTx) {
                    setTransactions((prev) => [newTx, ...prev]);
                  } else {
                    loadTransactions();
                  }
                  setShowAddModal(false);
                }}
              />
            </div>
          </div>
        )}
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full text-3xl shadow-lg flex items-center justify-center transition transform hover:scale-110"     >
          +
        </button>
      </div>

      {/* Add Transaction */}
      <div className="mt-6">
        <AddTransaction
          darkMode={darkMode}
          reload={(newTx) => {
            if (newTx) {
              setTransactions((prev) => [newTx, ...prev]);
            } else {
              loadTransactions();
            }
          }}
        />
      </div>

      {/* Income Section */}
      <h3 className="text-green-600 text-2xl font-bold mt-8 mb-4">
        Income
      </h3>

      {incomeTransactions.length === 0 ? (
        <p 
         className={`italic p-4 rounded-xl ${
          darkMode            
            ? "bg-gray-800 text-gray-400"
            : "bg-white text-gray-500"
         }`}>No income transactions yet.Start tracking your  financial journey💸</p>
      ) : (
        incomeTransactions.map((t) => (
          <div
            key={t._id || t.id}
            className="bg-green-100 p-4 rounded-xl shadow mb-3 transition hover:scale-[1.01]"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <h4 className="font-bold text-green-800 text-lg">
                  {t.category || "Income"}
                </h4>

                <p className="text-gray-700">
                  {t.note || "No note added"}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>

              <div className="font-bold text-green-700 text-lg sm:text-xl">
                +${t.amount.toFixed(2)}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Expense Section */}
      <h3 className="text-red-600 text-2xl font-bold mt-8 mb-4">
        Expenses
      </h3>

      {expenseTransactions.length === 0 ? (
        <p
          className={`italic p-4 rounded-xl ${
            darkMode
              ? "bg-gray-800 text-gray-400"
              : "bg-white text-gray-500"
          }`}
        >
          No expense transactions yet.
        </p>
      ) : (
        expenseTransactions.map((t) => (
          <div
            key={t._id || t.id}
            className="bg-red-100 p-4 rounded-xl shadow mb-3 transition hover:scale-[1.01]"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <h4 className="font-bold text-red-800 text-lg">
                  {t.category || "Expense"}
                </h4>

                <p className="text-gray-700">
                  {t.note || "No note added"}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>

              <div className="font-bold text-red-700 text-lg sm:text-xl">
                -${t.amount.toFixed(2)}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Balance */}
      <div
        className={`mt-8 p-6 rounded-xl shadow text-center ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold">
          Balance: ${balance.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default Dashboard;