import React from 'react';
 // Update the path to your image

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header Section */}
            <header className="bg-transparent text-white p-6  ">
            
            </header>

            {/* Main Content Section */}
            <main className="flex-grow p-6 flex items-center">
                <section className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center w-full md:w-1/2">
                    <h2 className="text-3xl font-semibold mb-4">Welcome to Your Expense Tracker</h2>
                    <p className="text-gray-700 mb-4">
                        Manage your expenses effortlessly and gain insights into your spending habits. 
                        Our tool provides you with detailed reports, charts, and an intuitive interface to keep track of your finances.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Whether you are an individual or managing a family budget, our application is designed to meet your needs. 
                        Start tracking your expenses today and take control of your financial future!
                    </p>
                    <div className="mt-4">
                        <a href="/register" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Get Started</a>
                    </div>
                </section>

                {/* Image Section */}
                <div className="hidden md:flex md:w-1/2 justify-center">
                    <img src='https://images.pexels.com/photos/5466785/pexels-photo-5466785.jpeg?auto=compress&cs=tinysrgb&w=600' alt="Expense Tracker" className="w-full h-auto object-cover rounded-lg shadow-md" />
                </div>
            </main>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white p-4 ">
                <div className="text-center">
                    <p >Support us</p>
                   
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
