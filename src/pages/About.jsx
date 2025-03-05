// src/components/About.js
import React from 'react';

const About = () => {
    return (
        <div>
            {/* Mission Statement */}
            <section className="mission py-20 bg-cover bg-center mt-10"  style={{ backgroundImage: "url('https://events.enderuncolleges.com/wp-content/uploads/2019/03/image1-3.jpg')"}}>
                <div className="container mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold text-white">Our Mission</h2>
                    <p className="text-lg text-gray-500 mt-4 max-w-3xl mx-auto">
                        To provide an easy and efficient platform for event management, ensuring a memorable experience for organizers and participants alike.
                    </p>
                </div>
            </section>

            {/* About Our Events */}
            <section className="about-events py-20 bg-gray-50">
                <div className="container mx-auto text-center px-6">
                    <h2 className="text-3xl font-semibold">About Our Events</h2>
                    <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-600">
                        At Lex Events, we specialize in creating impactful events that bring people together, from corporate gatherings to community festivals. Our platform ensures a seamless experience for organizers to manage every detail while providing attendees with engaging and memorable moments.
                    </p>
                </div>
            </section>

            {/* Events Section with Colors */}
            <section className="events py-20 bg-white">
                <div className="container mx-auto text-center px-6">
                    <h2 className="text-3xl font-semibold">Our Event Categories</h2>
                    <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-600">
                        Explore our diverse range of events designed to cater to various interests and communities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                        {/* Corporate Event */}
                        <div className="event-category bg-blue-100 rounded-lg p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-blue-700">Corporate Events</h3>
                            <p className="text-gray-600 mt-2">Professional gatherings, seminars, and conferences tailored for corporate audiences.</p>
                        </div>
                        {/* Community Event */}
                        <div className="event-category bg-green-100 rounded-lg p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-green-700">Community Events</h3>
                            <p className="text-gray-600 mt-2">Engaging festivals and fairs that bring communities together in celebration.</p>
                        </div>
                        {/* Workshop */}
                        <div className="event-category bg-yellow-100 rounded-lg p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-yellow-700">Workshops</h3>
                            <p className="text-gray-600 mt-2">Interactive workshops to build skills and share knowledge on various topics.</p>
                        </div>
                        {/* Concert */}
                        <div className="event-category bg-purple-100 rounded-lg p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-purple-700">Concerts</h3>
                            <p className="text-gray-600 mt-2">Live music events featuring a diverse range of artists and genres.</p>
                        </div>
                        {/* Sports Event */}
                        <div className="event-category bg-red-100 rounded-lg p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-red-700">Sports Events</h3>
                            <p className="text-gray-600 mt-2">Exciting sports competitions and tournaments for all enthusiasts.</p>
                        </div>
                        {/* Charity Event */}
                        <div className="event-category bg-pink-100 rounded-lg p-6 shadow-lg">
                            <h3 className="text-2xl font-bold text-pink-700">Charity Events</h3>
                            <p className="text-gray-600 mt-2">Events aimed at raising funds and awareness for charitable causes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team py-20">
                <div className="container mx-auto text-center px-6">
                    <h2 className="text-3xl font-semibold">Meet Our Team</h2>
                    <p className="mt-4 text-gray-600">The people behind Lex Events who make it all possible</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                       
                        {/* Example Team Member */}
                        <div className="team-member bg-white shadow-lg rounded-lg p-6 transition transform hover:-translate-y-2">
                            <img src="https://th.bing.com/th?id=OIP.AwGBn0RaiFXEpXemdj-2LQHaLG&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" />
                            <h3 className="mt-4 text-xl font-semibold">Alex mahone</h3>
                            <p className="text-gray-500">Manager</p>
                        </div>
                        <div className="team-member bg-white shadow-lg rounded-full p-6 transition transform hover:-translate-y-2">
                            <img src="https://th.bing.com/th?id=OIP.hLTThhxHPeGqFQVjpD1-hwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" />
                            <h3 className="mt-4 text-xl font-semibold">Lex Brian</h3>
                            <p className="text-gray-500">Sales and Marketing</p>
                        </div>
                        <div className="team-member bg-white shadow-lg rounded-full p-6 transition transform hover:-translate-y-2">
                            <img src="https://th.bing.com/th?id=OIP.O8vv9O4Ku4HvFQyep-NXMAHaLG&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"/>
                            <h3 className="mt-4 text-xl font-semibold">Judy Jusmine</h3>
                            <p className="text-gray-500">Designer</p>
                        </div>

                    </div>
                
                
            
                    
                </div>
            </section>
        </div>
    );
};

export default About;
