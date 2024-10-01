import React, { useState } from "react";
import axios from "axios";
import authService from "../Auth/authService"; // Ensure the correct import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await authService.register(username, password);
      toast.success("Registered successfully");
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
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
      className="md:flex block justify-center items-center h-screen bg-gray-500"
    >
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side (Form) */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-secondary mb-1 text-center">
            Expense Tracker
          </h2>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Welcome, Register
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
              className="w-full bg-blue-500 text-white p-3 rounded mt-1 hover:bg-blue-600 transition duration-200"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Register"
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
              Have an account?{" "}
              <Link to="/login" className="text-red-500">
                Login
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

          <p className="text-secondary font-thin text-xl text-center items-center justify-center mt-20">
            Welcome to Register page
          </p>
        </div>
      </div>
    </motion.div>
  );
}
