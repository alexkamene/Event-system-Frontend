import React, { useState } from "react";
import authService from "../Auth/authService"; 
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
      await authService.login(username, password);
      toast.success("Logged in successfully!");
      navigate("/Dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username, please try again.");
      } else if (error.response && error.response.status === 402) {
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
      transition={{ duration: 1.5 }}
      className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-300"
    >
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden">
        
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Welcome Back
          </h2>
          <h3 className="text-lg text-gray-700 mb-6 text-center">
            Please login to access your dashboard
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
                "Login"
              )}
            </button>
          </form>

          <ToastContainer position="top-right" autoClose={5000} />

          <div className="py-6 text-center">
            <span className="text-gray-600">Or</span>
          </div>
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
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
          <h1 className="text-2xl text-white font-bold">
            Track your expenses efficiently!
          </h1>
        </div>
      </div>
    </motion.div>
  );
}
