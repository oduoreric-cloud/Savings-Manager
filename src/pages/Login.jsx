import { useState } from "react";
import { loginUser } from "../api/auth";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      console.log("LOGIN RESPONSE:", data);

      localStorage.setItem("token", data.token);
      
      alert("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded w-96"
      >

        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;