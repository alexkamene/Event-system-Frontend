import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-600 text-gray-200 py-6 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                About Us
              </h3>
              <p className="text-sm">
                Expense Tracker is dedicated to helping individuals manage their
                finances effectively. Our platform provides intuitive tools for
                tracking expenses, setting budgets, and achieving financial
                goals.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Quick Links
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="/dashboard" className="hover:text-primary">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/add-expense" className="hover:text-primary">
                    Add Expense
                  </a>
                </li>
                <li>
                  <a href="/reports" className="hover:text-primary">
                    Reports
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-2 bg-gray-700 rounded-full hover:bg-primary"
                >
                  <FaFacebookF className="text-white" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-700 rounded-full hover:bg-primary"
                >
                  <FaTwitter className="text-white" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-700 rounded-full hover:bg-primary"
                >
                  <FaInstagram className="text-white" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-700 rounded-full hover:bg-primary"
                >
                  <FaLinkedinIn className="text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="mt-12 border-t border-gray-700 pt-4 text-center text-sm">
            <p>&copy; 2024 Expense Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
