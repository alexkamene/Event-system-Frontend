import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const upcomingEventsRef = useRef(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://event-management-system-backend-33ue.onrender.com/events'); // Replace with your API URL
                setEvents(response.data);
                // console.log("Fetched events:", response.data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleScrollToUpcomingEvents = () => {
        upcomingEventsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            {/* Hero Section */}
            <section
                className="hero bg-cover bg-center h-screen relative"
                style={{
                    backgroundImage: "url('https://events.enderuncolleges.com/wp-content/uploads/2019/03/image1-3.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="flex flex-col items-center justify-center h-full relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold leading-tight">Welcome to Lex Events</h1>
                    <p className="text-2xl mt-4 max-w-lg">Your gateway to amazing events</p>
                    <button
                        onClick={handleScrollToUpcomingEvents}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg mt-8 transition duration-300"
                    >
                        View Events
                    </button>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section ref={upcomingEventsRef} className="upcoming-events py-20 bg-white">
                <div className="container mx-auto text-center px-6">
                    <h2 className="text-3xl font-serif">Upcoming Events</h2>
                    <p className="mt-2 text-gray-600">Don’t miss out on our exciting events</p>
                    {loading ? (
                        <p className="text-gray-500 mt-10">Loading events...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <div
                                        key={event._id}
                                        className={`event-card shadow-lg rounded-lg overflow-hidden ${
                                            event.status === 'highlight' ? 'bg-yellow-100' :
                                            event.status === 'sold-out' ? 'bg-red-100' :
                                            'bg-white'
                                        }`}
                                    >
                                        <img src={event.image || "/path-to-default-image.jpg"} alt={event.name} className="w-full h-96
                                         object-cover" />
                                        <div className="p-6">
                                            <h3 className="font-bold text-xl mb-2 text-blue-600 hover:text-blue-700">{event.name}</h3>
                                            <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                                            <a href={`/events/register/${event._id}`} className="text-blue-600 font-semibold mt-4 inline-block">
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 mt-10">No upcoming events at the moment.</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
              {/* Testimonials Section */}
<section className="testimonials py-20 bg-gray-100">
    <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl font-semibold">What Our Users Say</h2>
        <p className="mt-2 text-gray-600">Our clients love the Lex Events experience</p>
        <div className="flex flex-col md:flex-row justify-center mt-10 space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/3">
                <blockquote className="italic text-lg leading-relaxed">
                    "This platform made registering for events so easy! I’ve never enjoyed event planning as
                    much as I do with Lex Events." - <span className="font-semibold">Kelvin Mahone</span>
                </blockquote>
            </div>
            <div className="w-full md:w-1/3">
                <blockquote className="italic text-lg leading-relaxed">
                    "The variety of events offered is impressive! I can always find something that interests me." - <span className="font-semibold">Alice Johnson</span>
                </blockquote>
            </div>
            <div className="w-full md:w-1/3">
                <blockquote className="italic text-lg leading-relaxed">
                    "Lex Events provides an excellent user experience. I love the notifications for upcoming events!" - <span className="font-semibold">John Doe</span>
                </blockquote>
            </div>
        </div>
    </div>
</section>

            
           {/* footre section */}
           <footer className="py-10 bg-black text-white">
                <div className="container mx-auto text-center px-6">
                    <p>&copy; 2024 Lex Events. All rights reserved.</p>
                    <div className="social-icons mt-4 flex justify-center space-x-6">
                        <a href="#" className="text-blue-500 hover:text-white">
                            <FaFacebook size={24} />
                        </a>
                        <a href="#" className="text-blue-400 hover:text-white">
                            <FaTwitter size={24} />
                        </a>
                        <a href="#" className="text-pink-500 hover:text-white">
                            <FaInstagram size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
