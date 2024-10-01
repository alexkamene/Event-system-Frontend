import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import authService from "../Auth/authService";

function Navbar() {
  const navlinks = [
    { name: "Home", route: "/" },
    { name: "Reports", route: "/reports" },
    { name: "Expenses", route: "/" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(true); // Set to true for sticky
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHome, setIsHome] = useState(false);
  const [navBg, setNavBg] = useState("bg-transparent");
  const [loginOpen, setLoginOpen] = useState(false);
  const [userName, setUserName] = useState(null); // Check for username in local storage
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Boolean for login state

  const mobileOpen = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Check if the user is on the home or login page
  useEffect(() => {
    setIsHome(location.pathname === "/");
    setLoginOpen(location.pathname === "/login");
    setIsFixed(
      location.pathname !== "/register" || location.pathname === "/login"
    );
  }, [location]);

  // Adjust the navbar background based on scroll position and page
  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavBg("bg-black backdrop-blur-xl bg-opacity-90");
      } else {
        setNavBg("bg-white");
      }
    } else {
      setNavBg(
        `${isHome || location.pathname === "/" ? "bg-transparent" : "bg-white"}`
      );
    }
  }, [scrollPosition, isHome, location.pathname]);

  // Track the scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in by checking localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUserName(storedUser);
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // No user found
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("username"); // Remove username from localStorage
    setIsLoggedIn(false); // Update login state
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className={`${navBg} fixed top-0 transition-colors bg-slate-300 duration-500 w-full z-10 ease-in-out`}
    >
      <div className="lg:w-[95%] sm:px-6 mx-auto">
        <div className="flex items-center px-[15px] py-[25px] justify-between">
          <div className="font-bold text-secondary text-2xl">
            <h1>Expense Tracker</h1>
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={mobileOpen}
              className="focus:outline-none hover:text-primary"
            >
              <FaBars className="h-[30px] w-[30px]" />
            </button>
          </div>

          <ul
            className={`flex ml-auto justify-center font-bold ${
              isMobileOpen
                ? "flex-col absolute block top-full left-0 w-full bg-white transition-transform ease-in-out duration-300"
                : "hidden md:flex"
            }`}
          >
            {navlinks.map((link) => (
              <li
                key={link.name}
                className="mx-[25px] mt-[9px] md:block hidden "
              >
                <NavLink
                  to={link.route}
                  className="text-black   hover:text-primary  font-semibold"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {!isLoggedIn ? (
              loginOpen ? (
                <li>
                  <NavLink
                    to="/login"
                    className="text-black hover:text-primary text-semibold mt-[9px]"
                  >
                    Register
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className="text-black hover:text-primary md:block hidden text-semibold mt-[9px]"
                  >
                    Login
                  </NavLink>
                </li>
              )
            ) : null}

            {isLoggedIn && (
              <>
                <li>
                  <span className="text-black font-semibold hidden md:block mt-[9px] ml-6">
                    Welcome,{" "}
                    <span className="font-extrabold text-secondary">
                      {userName}
                    </span>
                  </span>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="text-black hover:text-primary md:block hidden mt-[9px] ml-6"
                  >Dashboard</NavLink>
                </li>
                <li>
                  <img
                    src="https://th.bing.com/th?id=OIP.AwGBn0RaiFXEpXemdj-2LQHaLG&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                    alt="user"
                    className="w-[41px] h-[41px] rounded-full ml-1 hidden md:block"
                  />
                </li>
                <li
                  onClick={handleLogout}
                  className="text-white bg-secondary btn py-3 px-2 font-bold ml-1 hover:text-primary md:block hidden"
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* For mobile view */}
      {isMobileOpen && (
        <div className="md:hidden flex flex-col bg-white p-4 shadow-lg">
          {navlinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.route}
              className="text-black hover:text-primary py-2"
            >
              {link.name}
            </NavLink>
          ))}
          {!isLoggedIn && (
            <NavLink to="/login" className="text-black hover:text-primary py-2">
              Login
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              to="/dashboard"
              className="text-black hover:text-primary py-2"
            >
              Dashboard
            </NavLink>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-black hover:text-primary py-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </motion.nav>
  );
}

export default Navbar;
