import {
 getRecurringTransactions,
 toggleRecurringTransaction,
 deleteRecurringTransaction
}
from "../api/recurring";

import { useEffect,useState } from "react";


function RecurringTransactions({darkMode, reloadTrigger}){


const [items,setItems]=useState([]);



const load=async()=>{
 const data=
 await getRecurringTransactions();

 setItems(data);
};


useEffect(()=>{
 load();
},[reloadTrigger]);



return (

<div
className={`p-5 rounded-xl shadow ${
darkMode
?"bg-gray-800 text-white"
:"bg-white"
}`}
>


<h2 className="text-xl font-bold mb-4">
🔁 Recurring Transactions
</h2>


{
items.length===0 ?

<p>
No recurring payments yet.
</p>

:

items.map(item=>(

<div
key={item._id}
className="border rounded-lg p-4 mb-3"
>


<h3 className="font-bold">
{item.note}
</h3>


<p>
Amount: ${item.amount}
</p>


<p>
Frequency: {item.frequency}
</p>


<p>
Next:
{new Date(item.nextDate)
.toLocaleDateString()}
</p>


<p>
Status:
{
item.active
?
"🟢 Active"
:
"🔴 Paused"
}
</p>



<div className="flex gap-2 mt-3">


<button
onClick={async()=>{
await toggleRecurringTransaction(item._id);
load();
}}
className="bg-yellow-500 text-white px-3 py-1 rounded"
>
Pause/Resume
</button>


<button
onClick={async()=>{
await deleteRecurringTransaction(item._id);
load();
}}
className="bg-red-600 text-white px-3 py-1 rounded"
>
Delete
</button>


</div>


</div>

))

}


</div>

);


}


export default RecurringTransactions;