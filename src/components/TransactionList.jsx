function TransactionList({ transactions }) {

  return (
    <div>

      <h3 className="text-xl font-bold mb-3">
        Transactions
      </h3>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Description</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-t">

              <td className="p-2">{t.description}</td>

              <td
                className={`p-2 ${
                  t.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ${t.amount}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default TransactionList;