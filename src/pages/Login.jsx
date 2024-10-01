import React, { useState } from "react";
import authService from "../Auth/authService"; // Ensure the correct import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(username, password);
      toast.success("Logged in successfully!");
      navigate("/Dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username, please try again.");
      }
      if (error.response && error.response.status === 402) {
        toast.error("Wrong password, please try again.");
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="md:flex block justify-center items-center  h-screen bg-gray-400"
    >
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side (Form) */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-secondary mb-1 text-center">
            Expense tracker
          </h2>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Welcome, Please login to continue
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="py-6 text-center font-bold">
            <h4>Or</h4>
          </div>
          <div className="text-black text-center">
            <p>
              Don't an account?{" "}
              <Link to="/register" className="text-red-500">
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Right side (Image) */}
        <div
          className="w-1/2 bg-cover bg-center "
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/5466785/pexels-photo-5466785.jpeg?auto=compress&cs=tinysrgb&w=600')`,
          }}
        >
          <h1 className="text-center text-xl font-bold">Expense tracker</h1>
        </div>
      </div>
    </motion.div>
  );
}
