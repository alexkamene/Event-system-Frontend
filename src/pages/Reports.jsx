import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2"; // Import Bar chart from Chart.js
import { Line } from "react-chartjs-2"; // Import Line chart from Chart.js
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Import components from Recharts
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";

// Register the necessary components for Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ChartTooltip,
  ChartLegend
);

const Reports = () => {
  const [expenses, setExpenses] = useState([]); // State to hold expense data
  const [totalExpenses, setTotalExpenses] = useState(0); // State to hold total expenses
  const [highestExpense, setHighestExpense] = useState(null); // State to hold highest expense
  const [lowestExpense, setLowestExpense] = useState(null); // State to hold lowest expense
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to hold authentication status

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchExpenses(token); // Fetch expenses if the user is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);

  // Function to fetch expenses from the API
  const fetchExpenses = async (token) => {
    try {
      // Fetch expenses data
      const response = await axios.get("http://localhost:3000/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(response.data); // Set expenses state
      calculateReports(response.data); // Calculate total, highest, and lowest expenses
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Function to calculate total, highest, and lowest expenses
  const calculateReports = (data) => {
    const total = data.reduce((acc, expense) => acc + expense.amount, 0); // Calculate total
    const highest = data.reduce(
      (max, expense) => (expense.amount > max ? expense.amount : max),
      0
    ); // Calculate highest
    const lowest = data.reduce(
      (min, expense) => (expense.amount < min ? expense.amount : min),
      Infinity
    ); // Calculate lowest

    setTotalExpenses(total); // Update total expenses state
    setHighestExpense(highest); // Update highest expense state
    setLowestExpense(lowest); // Update lowest expense state
  };

  // Bar Chart Component
  const BarChart = () => {
    const groupedExpenses = {};

    // Group expenses by month
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
      });
      groupedExpenses[month] = (groupedExpenses[month] || 0) + expense.amount;
    });

    const data = {
      labels: Object.keys(groupedExpenses), // X-axis labels
      datasets: [
        {
          label: "Monthly Expenses", // Dataset label
          data: Object.values(groupedExpenses), // Dataset values
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
          borderColor: "rgba(75, 192, 192, 1)", // Bar border color
          borderWidth: 1, // Bar border width
        },
      ],
    };

    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Monthly Expenses</h2>
        <Bar data={data} /> {/* Render Bar chart */}
      </div>
    );
  };

  // Line Chart Component
  const LineChart = () => {
    const groupedExpenses = {};

    // Group expenses by month
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
      });
      groupedExpenses[month] = (groupedExpenses[month] || 0) + expense.amount;
    });

    const data = {
      labels: Object.keys(groupedExpenses), // X-axis labels
      datasets: [
        {
          label: "Expenses Trend", // Dataset label
          data: Object.values(groupedExpenses), // Dataset values
          fill: false, // Disable fill under line
          backgroundColor: "rgba(153, 102, 255, 0.6)", // Line color
          borderColor: "rgba(153, 102, 255, 1)", // Line border color
        },
      ],
    };

    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Expenses Trend Over Time
        </h2>
        <Line data={data} /> {/* Render Line chart */}
      </div>
    );
  };

  // Donut Chart Component
  const DonutChart = () => {
    const categories = {};

    // Group expenses by category
    expenses.forEach((expense) => {
      categories[expense.category] =
        (categories[expense.category] || 0) + expense.amount;
    });

    const data = Object.keys(categories).map((key) => ({
      name: key, // Category name
      value: categories[key], // Category value
    }));

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699"]; // Color palette

    return (
      <div className="chart-container">
        <h2 className="text-2xl font-semibold mb-4">
          Expense Distribution by Category (Donut)
        </h2>
        <PieChart width={400} height={400}>
          {" "}
          {/* Set chart dimensions */}
          <Tooltip /> {/* Tooltip for hover info */}
          <Legend /> {/* Legend for the chart */}
          <Pie
            data={data} // Data for the Pie chart
            cx="50%" // Center X position
            cy="50%" // Center Y position
            labelLine={false} // Disable label lines
            label={({ name, value }) => `${name} (${value})`} // Label formatting
            outerRadius={80} // Outer radius of the pie
            fill="#8884d8" // Fill color
            dataKey="value" // Data key for values
            innerRadius={30} // Inner radius for donut effect
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              /> // Color for each slice
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  };

  // Render the Reports page
  return (
    <div className="reports p-6 bg-gray-50 min-h-screen mt-20 px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Expense Reports</h1>
      {!isAuthenticated ? (
        <p className="text-red-500 text-center">
          You need to log in to view your reports.
        </p> // Show login prompt if not authenticated
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">
              Total Expenses: ${totalExpenses.toFixed(2)}
            </h2>
            <h3 className="text-lg">Highest Expense: ${highestExpense}</h3>
            <h3 className="text-lg">Lowest Expense: ${lowestExpense}</h3>
          </div>

          {/* Render the charts */}
          <BarChart />
          <LineChart />
          <DonutChart />
        </>
      )}
    </div>
  );
};

export default Reports;
