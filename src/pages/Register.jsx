import { useState } from "react";
import { registerUser } from "../api/auth";

function Register() {

  const [form, setForm] = useState({
    name: "",
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
      const data = await registerUser(form);
      localStorage.setItem("token", data.token);
      alert("Registration successful");
      window.location.href = "/";
    } catch (error) {
      console.error("REGISTER ERROR:", error.response?.data);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded w-96"
      >

        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;