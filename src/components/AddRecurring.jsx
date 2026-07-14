import { useState } from "react";
import { createRecurringTransaction } from "../api/recurring";


function AddRecurring({ reload, darkMode }) {

  const [form,setForm] = useState({
    note:"",
    amount:"",
    type:"expense",
    category:"",
    frequency:"monthly",
    nextDate:""
  });


  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{

      await createRecurringTransaction({
        ...form,
        amount:Number(form.amount)
      });


      alert("Recurring transaction added ✅");


      setForm({
        note:"",
        amount:"",
        type:"expense",
        category:"",
        frequency:"monthly",
        nextDate:""
      });


      reload();


    }catch(error){

      console.log(
        error.response?.data
      );

    }

  };


return (

<form
onSubmit={handleSubmit}
className="space-y-3"
>


<input
name="note"
placeholder="Name e.g Rent"
value={form.note}
onChange={handleChange}
className="border p-2 w-full rounded"
/>


<input
type="number"
name="amount"
placeholder="Amount"
value={form.amount}
onChange={handleChange}
className="border p-2 w-full rounded"
/>


<select
name="type"
value={form.type}
onChange={handleChange}
className="border p-2 w-full rounded"
>

<option value="expense">
Expense
</option>

<option value="income">
Income
</option>

</select>



<select
name="frequency"
value={form.frequency}
onChange={handleChange}
className="border p-2 w-full rounded"
>

<option value="daily">
Daily
</option>

<option value="weekly">
Weekly
</option>

<option value="monthly">
Monthly
</option>

<option value="yearly">
Yearly
</option>

</select>



<input
type="date"
name="nextDate"
value={form.nextDate}
onChange={handleChange}
className="border p-2 w-full rounded"
/>



<button
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
Add Recurring
</button>


</form>

);

}


export default AddRecurring;