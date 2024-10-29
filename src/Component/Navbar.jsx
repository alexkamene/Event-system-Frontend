import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMessage, AiOutlineBell, AiOutlineSearch, AiOutlineHome, AiOutlineMenu } from 'react-icons/ai';
import CountryFlag from 'react-country-flag';
import { MdOutlineRoundaboutLeft } from 'react-icons/md';
import AuthContext from '../context/Authcontext.jsx'; // Adjust the path as necessary
import axios from 'axios';

export default function Navbar() {
    const { user, isAdmin, isOrganizer, logout } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [notificationCount, setNotificationCount] = useState(0);
    const [messageCount] = useState(3); // Example count, replace with actual data
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [avatar, setAvatar] = useState('');
    const userid = localStorage.getItem('userid');

    const fetchAvatar = async () => {
        try {
            const response = await axios.get('https://event-management-system-backend-dtrl.onrender.com/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAvatar(response.data.profilePicture);
        } catch (error) {
            console.error('Failed to fetch avatar:', error);
        }
    };

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://event-management-system-backend-dtrl.onrender.com/notifications`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setNotifications(response.data);
            setNotificationCount(response.data.filter(n => !n.read).length); // Count unread notifications

        } catch (error) {
            setError('Failed to fetch notifications');
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvatar();
        if (user) {
            fetchNotifications();
        }
    }, [user]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        // Implement search functionality here
    };

    const handleLogout = () => {
        logout();
        // Redirect to home page after logout
        window.location.href = '/login';
    };

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`https://event-management-system-backend-dtrl.onrender.com/notifications/${notificationId}/read`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotifications((prev) => prev.map(n => (n._id === notificationId ? { ...n, read: true } : n)));
            setNotificationCount(prev => prev - 1);
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    // Determine the background color based on user role
    const getNavbarBackgroundColor = () => {
        if (isAdmin) return 'bg-blue-600'; // Admin mood
        if (isOrganizer) return 'bg-green-600'; // Organizer mood
        return 'bg-gray-600'; // Default user mood
    };

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <nav className={`p-4 fixed top-0 text-black w-full z-50 ${getNavbarBackgroundColor()}`}>
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-white font-bold text-xl">{isAdmin ? 'Admin Panel' : isOrganizer ? 'Organizer Dashboard' : user ? 'User Dashboard' : 'Lex Events'}</h1>

                        <form onSubmit={handleSearch} className="hidden items-center flex-grow mt-2 md:mt-0">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-24 md:w-auto h-8 ml-6"
                            />
                            <button type="submit" className="text-white px-3 text-3xl ml-3 rounded">
                                <AiOutlineSearch />
                            </button>
                        </form>

                        {/* Hamburger Icon for Mobile */}
                        <div className="md:hidden ">
                            <label htmlFor="my-drawer-4">
                                <AiOutlineMenu className="text-white hover:bg-gray-700 text-3xl mr-6" />
                            </label>
                        </div>

                        <div className="hidden md:flex items-center space-x-4 mt-2">
                            {/* Always visible links */}
                            <Link to="/" className="text-white font-bold hover:bg-gray-700 hover:text-white p-2 rounded">
                                <AiOutlineHome />
                            </Link>
                            <Link to="/about" className="text-white font-bold hover:bg-gray-700 hover:text-white p-2 rounded">
                                About
                            </Link>

                            {/* Notifications Dropdown */}
                            {user && (
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="relative font-bold text-gray-300 hover:bg-white hover:text-white p-2 rounded"
                                    >
                                        <AiOutlineBell />
                                        {notificationCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2">
                                                {notificationCount}
                                            </span>
                                        )}
                                    </button>
                                    {isDropdownOpen && (
                                        <ul className="absolute right-0 mt-2 w-48 h-48 bg-gray-700 text-gray-300 rounded-md shadow-lg z-50 overflow-y-scroll">
                                            {loading ? (
                                                <li className="px-4 py-2">Loading...</li>
                                            ) : error ? (
                                                <li className="px-4 py-2">{error}</li>
                                            ) : (
                                                notifications.map(notification => (
                                                    <li key={notification._id} className={`px-4 py-2 ${notification.read ? 'bg-gray-700' : 'bg-gray-600'}`}>
                                                        <Link to='#' onClick={() => markAsRead(notification._id)}>
                                                            {notification.message}
                                                        </Link>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    )}
                                </div>
                            )}

                            {/* User specific links */}
                            {user ? (
                                <>
                                    <div className="relative">
                                        <CountryFlag countryCode="US" svg style={{ width: '1.5em', height: '1.5em' }} />
                                    </div>
                                    <Link 
                                        to={isOrganizer ? "/dashboard/Organizer/Profile" : "/dashboard/user/Profile"} 
                                        className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded"
                                    >
                                        <img 
                                            src={avatar}
                                            alt="Profile Avatar" 
                                            className="w-8 h-8 rounded-full " 
                                        />
                                        <span className='text-white'>Profile</span>
                                    </Link>

                                    <button className="text-white font-bold" onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-white hover:bg-gray-700 hover:text-white p-2 rounded">
                                        Login
                                    </Link>
                                    <Link to="/register" className="text-white hover:bg-gray-700 hover:text-white p-2 rounded">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>

            {/* Drawer */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-gray-700 text-base-content h-3/4 rounded-md mt-10 drop-shadow-lg w-80 p-4">
                    <h2 className="text-lg font-bold text-white">Navigation</h2>
                    <li>
                        <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded">
                            <AiOutlineHome />
                            <span className='text-white'>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded">
                            <MdOutlineRoundaboutLeft />
                            <span className='text-white'>About</span>
                        </Link>
                    </li>
                    {user && (
                        <li>
                            <Link to={isOrganizer ? "/dashboard/Organizer/Profile" : "/dashboard/user/Profile"} className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded">
                                <img src={avatar} alt="Profile" className="w-8 h-8 rounded-full" />
                                <span className='text-white'>Profile</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
