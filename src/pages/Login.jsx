import React, { useContext, useState } from "react"; 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/Authcontext";
import logo from "../pages/images/1.webp"; // Adjust the path as necessary

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Both email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://event-management-system-backend-33ue.onrender.com/login", {
        email,
        password,
      });

      const { token, role, userId, username } = response.data;

      if (!token || !role || !userId || !username) {
        throw new Error("Invalid login response.");
      }

      localStorage.setItem("token", token); 
      localStorage.setItem("role", role);   
      localStorage.setItem("userId", userId); 
      localStorage.setItem("username", username);

      toast.success("Logged in successfully");

      switch (role) {
        case "admin":
          window.location.href = '/dashboard/admin';
          break;
        case "organizer":
          window.location.href = '/dashboard/organizer';
          break;
        default:
          window.location.href = '/dashboard/user';
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data || "Login failed");
      } else {
        toast.error("Login failed, please try again.");
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
      className="flex h-screen"
      style={{
        backgroundImage: `url('https://events.enderuncolleges.com/wp-content/uploads/2019/03/image1-3.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Event Description Side */}
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 p-12 text-[#56ff00] bg-slate-600 bg-opacity-50">
        <h2 className="text-4xl font-bold mb-4">Join Exciting Events!</h2>
        <p className="text-lg mb-4">
          Experience unforgettable moments and connect with amazing people.
          Our events are designed to inspire and entertain. Don't miss out!
        </p>
        <p className="text-lg">
          Whether you are looking for networking opportunities or just want to have fun, we have something for everyone.
        </p>
      </div>

      {/* Login Form Side */}
      <div className="flex justify-center items-center w-full md:w-1/2 p-6">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden p-8">
        <img src={logo} className="w-20 h-20 mx-auto  rounded-full mb-4" alt="Event Management" />
          <h2 className="text-2xl font-bold mb-1 text-center text-secondary">
            Event Management
          </h2>
          <h3 className="text-xl font-semibold mb-4 text-center">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <ToastContainer position="top-right" autoClose={5000} />
          <div className="py-6 text-center font-bold">
            <h4>Or</h4>
          </div>
          <div className="text-black text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-red-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
