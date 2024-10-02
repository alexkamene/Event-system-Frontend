import React, { useState } from "react";
import authService from "../Auth/authService"; 
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
      await authService.register(username, password);
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
      transition={{ duration: 1.5 }}
      className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-300"
    >
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden">
        
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Welcome to Expense Tracker
          </h2>
          <h3 className="text-lg text-gray-700 mb-6 text-center">
            Create your account below
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <ToastContainer position="top-right" autoClose={5000} />

          <div className="py-6 text-center">
            <span className="text-gray-600">Or</span>
          </div>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div
          className="w-full md:w-1/2 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/5466785/pexels-photo-5466785.jpeg?auto=compress&cs=tinysrgb&w=600')`,
          }}
        >
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold">
              Track Your Expenses Seamlessly
            </h1>
            <p className="mt-4 text-lg">
              Join today and take control of your financial life!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
