import React from "react";
import { Chart } from "react-google-charts";
import { motion } from "framer-motion";

const ExpenseChart = ({ expenses }) => {
  // Aggregate expenses by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    if (acc[exp.category]) {
      acc[exp.category] += exp.amount;
    } else {
      acc[exp.category] = exp.amount;
    }
    return acc;
  }, {});

  // Prepare data for the charts
  const chartData = [["Category", "Amount"], ...Object.entries(categoryTotals)];

  const pieOptions = {
    title: "Expenses Breakdown by Category (Pie Chart)",
    pieHole: 0.4,
    is3D: false,
  };

  const barOptions = {
    title: "Expenses Breakdown by Category (Bar Chart)",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Amount",
      minValue: 0,
    },
    vAxis: {
      title: "Category",
    },
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-wrap justify-between my-8"
    >
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
        <Chart
          chartType="PieChart"
          data={chartData}
          options={pieOptions}
          width={"100%"}
          height={"400px"}
        />
      </div>

      {/* Bar Chart */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
        <Chart
          chartType="BarChart"
          data={chartData}
          options={barOptions}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </motion.div>
  );
};

export default ExpenseChart;
