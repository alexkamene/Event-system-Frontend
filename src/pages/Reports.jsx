import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
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

// Register Chart.js components
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
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [highestExpense, setHighestExpense] = useState(null);
  const [lowestExpense, setLowestExpense] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchExpenses(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchExpenses = async (token) => {
    try {
      const response = await axios.get("https://expense-trackerserver.onrender.com/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(response.data);
      calculateReports(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const calculateReports = (data) => {
    const total = data.reduce((acc, expense) => acc + expense.amount, 0);
    const highest = data.reduce((max, expense) => (expense.amount > max ? expense.amount : max), 0);
    const lowest = data.reduce((min, expense) => (expense.amount < min ? expense.amount : min), Infinity);

    setTotalExpenses(total);
    setHighestExpense(highest);
    setLowestExpense(lowest);
  };

  const BarChart = () => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
      });
      groupedExpenses[month] = (groupedExpenses[month] || 0) + expense.amount;
    });

    const data = {
      labels: Object.keys(groupedExpenses),
      datasets: [
        {
          label: "Monthly Expenses",
          data: Object.values(groupedExpenses),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="chart-container">
        <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
        <Bar data={data} />
      </div>
    );
  };

  const LineChart = () => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
      });
      groupedExpenses[month] = (groupedExpenses[month] || 0) + expense.amount;
    });

    const data = {
      labels: Object.keys(groupedExpenses),
      datasets: [
        {
          label: "Expenses Trend",
          data: Object.values(groupedExpenses),
          fill: false,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
        },
      ],
    };

    return (
      <div className="chart-container">
        <h2 className="text-xl font-semibold mb-4">Expenses Trend Over Time</h2>
        <Line data={data} />
      </div>
    );
  };

  const DonutChart = () => {
    const categories = {};
    expenses.forEach((expense) => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });

    const data = Object.keys(categories).map((key) => ({
      name: key,
      value: categories[key],
    }));

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699"];

    return (
      <div className="chart-container">
        <h2 className="text-xl font-semibold mb-4">Expense Distribution by Category (Donut)</h2>
        <PieChart width={400} height={400}>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} (${value})`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            innerRadius={30}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  };

  return (
    <div className="reports p-6 bg-gray-50 min-h-screen mt-20 px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Expense Reports</h1>
      {!isAuthenticated ? (
        <p className="text-red-500 text-center">You need to log in to view your reports.</p>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Total Expenses: ${totalExpenses.toFixed(2)}</h2>
            <h3 className="text-lg">Highest Expense: ${highestExpense}</h3>
            <h3 className="text-lg">Lowest Expense: ${lowestExpense}</h3>
          </div>

          {/* Grid layout for charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarChart />
            <LineChart />
            <DonutChart />
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
