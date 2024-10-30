import React from 'react'

const AdminDashboard=()=> {
  return (
    <div>
      <h1>AdminDashboard</h1>
    </div>
  )
}
export default AdminDashboard
// import React, { useState } from 'react';
// import { FaHome, FaList, FaPlus, FaRegFolder, FaClipboardList, FaUsers, FaCheckCircle, FaBars } from 'react-icons/fa';

// const AdminPanel = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             {/* Sidebar */}
//             <aside className={`bg-gray-800 w-64 text-white transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
//                 <div className="p-4">
//                     <img src="profile-pic.jpg" alt="Profile" className="rounded-full h-16 w-16 mb-2" />
//                     <p className="text-lg font-semibold">Sajib Hossain</p>
//                 </div>
//                 <nav className="mt-4">
//                     <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                         <FaHome className="mr-2" /> Dashboard
//                     </a>
//                     <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                         <FaList className="mr-2" /> Event Category
//                     </a>
//                     <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                         <FaPlus className="mr-2" /> Create Category
//                     </a>
//                     <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                         <FaRegFolder className="mr-2" /> Category List
//                     </a>
//                     <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                         <FaClipboardList className="mr-2" /> Events
//                     </a>
//                     <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                         <FaPlus className="mr-2" /> Create Event
//                     </a>
//                     <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                         <FaClipboardList className="mr-2" /> Event List
//                     </a>
//                     <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                         <FaUsers className="mr-2" /> Add Event Member
//                     </a>
//                     <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                         <FaCheckCircle className="mr-2" /> Complete Event List
//                     </a>
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <div className="flex-1">
//                 {/* Navbar */}
//                 <nav className="bg-blue-600 p-4 flex justify-between items-center">
//                     <button onClick={toggleSidebar} className="text-white md:hidden">
//                         <FaBars className="text-2xl" />
//                     </button>
//                     <div className="text-white font-semibold">Admin Panel</div>
//                     <div className="flex items-center space-x-4">
//                         <a href="#" className="text-white">Home</a>
//                         <a href="#" className="text-white">Contact</a>
//                         <input type="text" placeholder="Search" className="px-2 py-1 rounded bg-gray-200 focus:outline-none" />
//                     </div>
//                 </nav>

//                 {/* Dashboard Cards */}
//                 <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//                     <div className="bg-blue-400 text-white p-4 rounded-lg">
//                         <h3 className="text-2xl">2</h3>
//                         <p>Event Categories</p>
//                     </div>
//                     <div className="bg-green-400 text-white p-4 rounded-lg">
//                         <h3 className="text-2xl">3</h3>
//                         <p>Events</p>
//                     </div>
//                     <div className="bg-yellow-400 text-white p-4 rounded-lg">
//                         <h3 className="text-2xl">6</h3>
//                         <p>User Registrations</p>
//                     </div>
//                     <div className="bg-red-400 text-white p-4 rounded-lg">
//                         <h3 className="text-2xl">1</h3>
//                         <p>Complete Event</p>
//                     </div>
//                 </div>

//                 {/* Event List Table */}
//                 <div className="p-6">
//                     <table className="min-w-full bg-white rounded-lg shadow-lg">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="text-left py-2 px-4">#</th>
//                                 <th className="text-left py-2 px-4">Name</th>
//                                 <th className="text-left py-2 px-4">Category</th>
//                                 <th className="text-left py-2 px-4">Start Date</th>
//                                 <th className="text-left py-2 px-4">End Date</th>
//                                 <th className="text-left py-2 px-4">Venue</th>
//                                 <th className="text-left py-2 px-4">Status</th>
//                                 <th className="text-left py-2 px-4">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td className="border px-4 py-2">1</td>
//                                 <td className="border px-4 py-2">Python Bootcamp</td>
//                                 <td className="border px-4 py-2">Bootcamp</td>
//                                 <td className="border px-4 py-2">July 23, 2020</td>
//                                 <td className="border px-4 py-2">July 24, 2020</td>
//                                 <td className="border px-4 py-2">Dhaka</td>
//                                 <td className="border px-4 py-2 text-green-500">Active</td>
//                                 <td className="border px-4 py-2">
//                                     <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
//                                     <button className="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
//                                     <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="border px-4 py-2">2</td>
//                                 <td className="border px-4 py-2">Data Science Bootcamp</td>
//                                 <td className="border px-4 py-2">Bootcamp</td>
//                                 <td className="border px-4 py-2">July 21, 2020</td>
//                                 <td className="border px-4 py-2">July 23, 2020</td>
//                                 <td className="border px-4 py-2">Beijing</td>
//                                 <td className="border px-4 py-2 text-green-500">Active</td>
//                                 <td className="border px-4 py-2">
//                                     <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
//                                     <button className="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
//                                     <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="border px-4 py-2">3</td>
//                                 <td className="border px-4 py-2">Web Design Bootcamp</td>
//                                 <td className="border px-4 py-2">Bootcamp</td>
//                                 <td className="border px-4 py-2">July 23, 2020</td>
//                                 <td className="border px-4 py-2">July 23, 2020</td>
//                                 <td className="border px-4 py-2">Berlin</td>
//                                 <td className="border px-4 py-2 text-red-500">Completed</td>
//                                 <td className="border px-4 py-2">
//                                     <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
//                                     <button className="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
//                                     <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminPanel;
