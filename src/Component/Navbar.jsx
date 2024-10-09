import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import authService from "../Auth/authService";

function Navbar() {
  const navlinks = [
    { name: "Home", route: "/" },
    { name: "Reports", route: "/reports" },
    { name: "About", route: "/Expenses" },
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
              className="focus:outline-none hover:text-primary mr-10"
            >
              <FaBars className="h-[30px] w-[30px] " />
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
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAPABBAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQMEAgUG/9oACAEBAAAAANYACeuZInkATAAnuJjrnqJ46rAEwAAAAAmAAKCHdoAEwACuumB3rkAJgARlrAX6AAmACMfIB1psAEwARnpAOeNekAmACvILhNmHmfTAJgAz0N+6QceLT6XQCYAM9HqagDP4npdAJgAon1QA+f8ARAJgAqv1+bTq9BT53O7X4usAmADi/rnX5+yzBq78/wBLyNABMAFk6qPE+i56YcPuMKAEwAX298493HaqnWpp4ATABdf0KnfQrywAmACdVghIZKwCYAFuoDnpziAEwAGztXzC6WakATAAda+kJKM4ATAAJ02iM1QAJgADq+yeaqAAJgAC9BblgAEwABuVR3ZnoABMABGywDHwAEwAZstWjfpunijHgjRqtATAGPDyT1IiORf6NgJgGDEAADr1rAmAeJAAAG3eE//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMFBAb/2gAKAgIQAxAAAACeIALCwIUAAACusaxN8JzAAACnqw6uXtJr7PnLYAAARPj+lrsBp5PTw7ZAABT0+P6O+dqEq2052/JAADP2YdvTEAeTfkgABXbDvRaazFb2pfl6+AAAKerLsaUpdF60tPi25YAAV2y7KyRBfl6eIAACnSz96RFsdeIAAAJz6tPWTjryZyAAACvox7ppzNOaAAACc+rT2JnHXizQAAF3semL1sTFqvO8bEAB11wAAclmH//EADgQAAIBAgMGBgADBQkAAAAAAAECAwARBBIxECEyQEFREyAwYXGBFEJSBSIjU5EzQ1BiY3KSobH/2gAIAQEAAT8A9YAkgCithcMCKsd27WgrEXANAMbWGtBWOgqxtfpe1ZWAvblgbGvE9qL3INhXiHtQbeb6EWNFvcE5bC3ag9lt/T7pJMqgdQSRpSuACCNdaSTKAOxuNKuMhB1veiylbWJPv0/xp3ZHPUGvHH6TXjj9NeOf0ivH/wAtCZDru5syoOt/immvuyj7om/lRyh9u1AggEcuzBRc08jP7Dt6MLbyvLEgAk0zFzf0lOVgTSyxto3KkA6inlJ3LuHpMemyCUn9xvo8pK1k+d3kAJNgCT7UIJz/AHZr8NP/ACzX4ef+Wa/Dz/yzQw05/J/U0cFLl3Ot6dHRrOpB2A2IPY8pPquwAkgAXJqLB9Zf+NKqqLKAB7eeSNJVyuLipoWhfKdOh2Lwr8Dk59V+NmGg8MZm4z/16WJi8WJh1G8bF4V+Byc+i1hY88tzovqSLlkdezEcpNwfdYIfw3PdqZlRSzHcKkxcrcJyCvFmG/O9RYs3Ak077ZplhHcnQU+Jmc8ZHsKE0ynjb7qDEiQ5W3NslF8W4/1OUkF0asH/AGJ/3GsVG8iKE6HSsPhggzOBm/8AKPvU+FOa8S/VRKUjRWNyBsxMEskuZRcECooUiWw16mnRXFmFxX4WUSi3CG4thF8ZL7E8oiBr300rCC0RHZzsxMrQwO667gKTFzo4YyM3cE7G6bcfO8MaBDYudaweJm8dEZyyueu2JAZcST1ktRFjbk4+AUgABt1JOx0V1ZWFwRvqP9nwI4e7NbQHYeLbNCk6ZHFQYKKBs4JZuhO0KqlrDUkn5NScR5OM7rUunlNwazmlJOvlOppjdieTBINxUbZgfNYDp5ncm4HKxNZ/n0Aytexvba5yqTy6NnW+0iXoyn5FXn7R1/G6ugoRhuJmf50oADbK9zYaDl1YqbilYMLjbYHpWUdvJJJ0XmQSpuKSUNuO4+UkAXNPKW3DcObTWg5FBlPWrjvRcDSiSb85Ctwxogg+RF6mmFiRzQBJAGtKMoAogGihrK3agnfZMv5uZJC2uQL96jjCb9SfQlVYrXYAHQHlSQBckAdzT4uJeG7U2LlbSy/FZ76nfUWIlh4W3djvFJ+0EPGhHuKXEwPpKv3uoEHQg/B2NJGvFIg+6fG4ddGLfAqTHyNujASmYkksSSeppZpE4WIpMYfzp9ikmik4W39jyMuLA3R7/emdnN2Yk+QEis1ZhV1q4q4rMKzHyx4iSPrmHY1HKkouuvUetipiSYl0HFyasyMGU2IqKQSIGHqaAnsL0SSST15TBNvdfvz/AP/EACURAAIBAgUEAwEAAAAAAAAAAAECABEwAxASIUEgMTJRE0Bhcf/aAAgBAgEBPwD67MFFTPkT3PlT3AwbsbruE/sOKxzBINREbUoNsxu53r0o5WKwYVFrENEOQQzQJoE0CFaTB5tYvgYg56sHu1pxVWg8ZpY7kxdW4MYkDaaT7i15mENif205osHYQEAZgimWGdyLTColKdSLTc23HPSBU3StMwCYBS63iZWVic3mNcqQGhvEAzRNH7Ao+z//xAAtEQACAQMCBAUDBQEAAAAAAAABAgMABBEhMBASMVEFEyBBYRQyUyJSYnGRof/aAAgBAwEBPwD0gA9TWF/dQCcpoBNMsaCpplqwvf23YommYqmM4yBX0V1+Kvobr8f/AEVJFJEcOhG7b2sk/TRe9R2ECd2NAYGODosilWGQauITBKyf5try5HNnHvioM+WuYwg9l9NzapcEEkggVNE0LlG2rNA9xGDwMgHSvNbsK81uwoyNSvmvExpE21YnF1HUje3pBxXiR/TFtW7cs8R/kKbVznvRdRoFp+U4IpQCdTXOvTl0pwudK8QbMiL2Tas0DzDPsM0xyTRBJocCDnhfoCqPtQS+TIGpXVwGXoeAOKJHG7uFkwi9Bt2UuhjP9jhj5FY+eE8oijJ9zoNwEqQQcEVBdLJhW0bjNMkI16+wqWVpWy27ajM6fBzRUGuQV4gNYzugEnAFWsBiBZvuNAkUWNSxiVCpp42jbDDaSN3OFFJaKPvOaVET7VAoEiueuf4osaIB6jNPbRt00qSB4/kd9iNBGgUbUyckjL6P/9k="
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
