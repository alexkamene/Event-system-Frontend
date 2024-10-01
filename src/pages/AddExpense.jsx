// src/pages/AddExpense.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal'; // Adjust the path according to your structure

const AddExpense = ({ onAddExpense }) => {
    const [expenseName, setExpenseName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:3000/add-expense', {
                category: expenseName,
                description,
                amount: parseFloat(amount),
                date,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token
                }
            });

            if (response.status === 201) {
                setExpenseName('');
                setDescription('');
                setAmount('');
                setDate('');
                toast.success('Expense added successfully!');
                onAddExpense(response.data); // Call the callback function
                setIsModalOpen(false); // Close the modal after successful submission
            }

        } catch (error) {
            if (error.response && error.response.status === 402) {
                toast.error('Failed to add an expense');
            } else {
                console.error('Failed to add expense:', error.response?.data || error.message);
                toast.error('Something went wrong, please try again.');
            }
        }
    };

    return (
       <div className='mt-14'>

<>
            <button
                onClick={() => setIsModalOpen(true)}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
                Add Expense
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-lg font-semibold text-center mb-4">Add New Expense</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Expense Name (Category)"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    >
                        Add Expense
                    </button>
                </form>
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
            </Modal>
        </>

       </div>
    );
};

export default AddExpense;
