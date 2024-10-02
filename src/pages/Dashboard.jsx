import React, { useState, useEffect } from 'react';
import AddExpense from './AddExpense';
import ExpenseChart from './ExpenseChart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchExpenses = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get('https://expense-trackerserver.onrender.com/expenses', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setExpenses(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false after fetching is complete
            }
        };

        fetchExpenses();
    }, [navigate]); 

    const handleAddExpense = (newExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    };
   
    // Calculate total, highest, and lowest expenses
    const calculateExpensesStats = () => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const highest = expenses.length ? Math.max(...expenses.map(expense => expense.amount)) : 0;
        const lowest = expenses.length ? Math.min(...expenses.map(expense => expense.amount)) : 0;
        
        return { total, highest, lowest };
    };

    const { total, highest, lowest } = calculateExpensesStats();



    //delete an expense
    const deleteExpense = async (id) => {
        const token = localStorage.getItem('token');
    

        try {
           const resp= await axios.delete(`https://expense-trackerserver.onrender.com/delete-expense/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Expense deleted successfully!');
            setExpenses((prevExpenses) => prevExpenses.filter(expense => expense._id !== id));
        
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.error('something went wrong  please try again');
            }
        }
    };



    return (
        <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="dashboard p-6 bg-gray-50 min-h-screen mt-20"
        >
            <h1 className="text-3xl font-bold mb-6 btn">Dashboard</h1>

            {/* Loading spinner */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="loader border-t-4 border-b-4 border-green-500 w-16 h-16 rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {/* Show charts and stats only when expenses are available */}
                    {expenses.length > 0 ? (
                        <>
                       {/* Show charts and stats only when expenses are available */}
{expenses.length > 0 ? (
    <>
        {/* Statistics section for total, highest, and lowest expenses */}
<div className="flex flex-col md:flex-row md:justify-between justify-normal items-center bg-slate-300
 text-white rounded-lg p-2 mb-6 mt-14 transition duration-300 ease-in-out transform hover:scale-105">
    
    {/* Total Expenses Box */}
    <div className="bg-white shadow-lg text-black shadow-md bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg p-4 m-4 w-full md:w-auto text-center hover:shadow-xl">
        <div className="flex items-center justify-center space-x-2">
            <h2 className="md:text-lg text-sm font-semibold">Total Expenses:</h2>
            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
            <span className="text-green-500 text-lg font-bold">↑</span>
        </div>
        <p className="text-xs text-gray-700 mt-1">Since last month</p> {/* Subscript content */}
    </div>

    {/* Highest Expense Box */}
    <div className="bg-white text-black bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-md rounded-lg p-4 m-4 w-full md:w-auto text-center hover:shadow-xl">
        <div className="flex items-center justify-center space-x-2">
            <h2 className="md:text-lg text-sm font-semibold">Highest Expense:</h2>
            <p className="text-2xl font-bold">${highest.toFixed(2)}</p>
            <span className="text-red-500 text-lg font-bold">↑</span> {/* Up arrow */}
        </div>
        <p className="text-xs text-gray-700 mt-1">Significant increase</p> {/* Subscript content */}
    </div>

    {/* Lowest Expense Box */}
    <div className="bg-white text-black bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-md rounded-lg p-4 m-4 w-full md:w-auto text-center hover:shadow-xl">
        <div className="flex items-center justify-center space-x-2">
            <h2 className="md:text-lg text-sm font-semibold">Lowest Expense:</h2>
            <p className="text-2xl font-bold">${lowest.toFixed(2)}</p>
            <span className="text-green-500 text-lg font-bold">↑</span> {/* Up arrow */}
        </div>
        <p className="text-xs text-gray-700 mt-1">Stable spending</p> {/* Subscript content */}
    </div>
</div>

    </>
) : null}


                            {/* Section to add new expenses */}
                            <AddExpense onAddExpense={handleAddExpense} />

                            {/* Section to display the charts */}
                            <ExpenseChart expenses={expenses} />

                            {/* Section to display all expense details */}
                            <h2 className="text-x32xlfont-semibold mb-4">All Expenses</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-gray-100 border-b ">
                                            <th className="text-left p-4 ">Category</th>
                                            <th className="text-left p-4">Amount</th>
                                            <th className="text-left p-4">Description</th>
                                            <th className="text-left p-4">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenses.map((expense, index) => (
                                            <tr key={index} className="border-b  hover:bg-gray-50">
                                                <td className="p-4">{expense.category}</td>
                                                <td className="p-4">${expense.amount.toFixed(2)}</td>
                                                <td className="p-4">{expense.description}</td>
                                          
                                          <td className="p-4">{new Date(expense.date).toLocaleDateString()}</td>
                                          <td className="p-4">
                                                    <button 
                                                        className="text-red-500 hover:underline"
                                                        onClick={() => deleteExpense(expense._id) }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (

                        
                        <div className="flex flex-col items-center justify-center mt-10">
                            <p className="text-xl font-bold text-gray-500">No expenses available</p>
                            <p className="text-lg text-gray-400">Start by adding your first expense.</p>


                            {/* Section to add new expenses */}
                            <AddExpense onAddExpense={handleAddExpense} />
                        </div>
                    )}
                </>
            )}

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
        </motion.div>
    );
};

export default Dashboard;
