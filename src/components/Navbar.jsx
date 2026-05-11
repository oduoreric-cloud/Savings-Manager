import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Finance Tracker</h1>

      <div className="space-x-4">

        <Link to="/login">
          <button className="mr-4 bg-white text-blue-600 px-3 py-1 rounded">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="bg-white text-blue-600 px-3 py-1 rounded">
            Register
          </button>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;