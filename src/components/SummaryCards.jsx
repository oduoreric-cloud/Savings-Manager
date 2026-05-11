function SummaryCards({ totalIncome, totalExpense, balance }) {
  console.log("SUMMARY INPUT:", { totalIncome, totalExpense, balance });

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">

      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-5 rounded-xl shadow-lg">
        <h3>Income</h3>
        <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
      </div>

      <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-5 rounded-xl shadow-lg">
        <h3>Expenses</h3>
        <p className="text-2xl font-bold">${totalExpense.toLocaleString()}</p>
      </div>

      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-5 rounded-xl shadow-lg">
        <h3>Balance</h3>
        <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
      </div>

    </div>
  );
}

export default SummaryCards;