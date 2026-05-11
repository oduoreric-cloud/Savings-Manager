import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Charts({ transactions, darkMode = false }) {

  console.log("CHART DATA:", transactions);

  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type !== "expense") return;
    const category = t.category || "Other";
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += Number(t.amount || 0);
  });

  const categoryChartData = Object.keys(categoryTotals).map((key) => ({
    name: key,
    value: categoryTotals[key],
  }));

  const monthlyData = {};

  transactions.forEach((t) => {
    if (!t.date) return;

    const date = new Date(t.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expense: 0 }; // ✅ FIXED
    }

    if (t.type === "income") {
      monthlyData[month].income += Number(t.amount || 0);
    } else if (t.type === "expense") {
      monthlyData[month].expense += Number(t.amount || 0);
    }
  });

  const chartData = Object.values(monthlyData);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expense },
  ];

  if (income === 0 && expense === 0) {
    return <p className="mt-6">No chart data yet</p>;
  }

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

  return (
    <div 
      className={`p-5 rounded-xl shadow-md mt-6 transition ${
        darkMode
          ? "bg-gray-800 text-white"
           : "bg-white text-gray-900"
      }`}
    >
      <h2 
        className={`text-xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>Financial Overview</h2>

      {/* PIE CHART */}
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent}) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                border: "none",
                borderRadius: "10px",
                color: darkMode ? "#ffffff" : "000000",
              }} 
            />
            <Legend
              wrapperStyle={{
                color: darkMode ? "#ffffff" : "000000",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART */}
      {/*<div className="mt-10" style={{ height: "300px" }}>
        <h2 className="text-xl font-bold mb-4">Monthly Trends</h2>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="income" stroke="#22c55e" />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>*/}
      {/* CATEGORY CHART */}
      <div className="mt-10" style={{ height: "300px" }}>
        <h2
          className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Expenses by Category
        </h2>
        {categoryChartData.length === 0 ? (
          <p>No category data yet</p>
        ) : null}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryChartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {categoryChartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                border: "none",
                borderRadius: "10px",
                color: darkMode ? "#ffffff" : "000000",
              }} 
            />
            <Legend
              wrapperStyle={{
                color: darkMode ? "#ffffff" : "000000",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;