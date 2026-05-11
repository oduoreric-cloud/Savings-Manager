
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

        {/* 🔥 Tailwind TEST (temporary) */}
        <h1 className="text-red-500 text-4xl font-bold text-center p-4">
          Finance Tracker 
        </h1>

        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;