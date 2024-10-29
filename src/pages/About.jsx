// src/components/About.js
import React from 'react';

const About = () => {
    return (
        <div>
            {/* Mission Statement */}
            <section className="mission py-20 bg-cover bg-center mt-10"  style={{ backgroundImage: "url('https://www.elementalproduction.com/wp-content/uploads/2021/05/corporate-events.jpg')"}}>
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
                            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIATIAzAMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAABAECAwUG/9oACAEBAAAAAHJkkkAkCSSSQmVZkkJAwz03sSTJIWUmSQEuOnts0n6BqSZkklSSZFOIuU03Sq8/2bzMyTKcki3lyCLXytWjno3bEySnJJ5jDPEL2jQtToemtYklOQy8rdbTffYomuWa9B0SSZTkrweXfo91ia1hfm8ejHT9DMhKhPG4uLPrHJrStKU5nGOv39pAVBLzeXa9DoUpFaQr5/Pod54CVScfLY9/tXM62yrGPBX7PYZCJWJp5dP0tqSzrRTEY5Sva7kgSrMnmeT6/NBHuPcnnw84in6lkAlaZFPL+uMcX55Nq1ewU7jAESvJJwO1tW1l09tJF69LQAlaZDkut0z3xRh2YX3eCAlcmTGl1d8Mefv0ibPWAIleSZOec3DTfm5M9HR90AAwJJEcMd7LqGtduq4AAYEyFOaywry2rZKN96ZAInAmQFcGTl3zQ06jrZIESvMkgknzXp5ykdjo+f8AUtAAYTJJzeZ3POp3Wjpvs+b63WdkAwmScuHbsVS5+G7Gk8To36DO9gxkqumkx1Si6hecENt83dmHChkiVst1qxjhQoq7nemM9La1CqTPObW7M0wzjLPLqIXzna1rr3rgtzukz0G64zOC+JzIvptqdXkYZsNobYNOvV0inKXzS6GqkbZvqRo1tzpo+j0Hr25HJz0h7Rc2w6PPpd63PuOJtPbKcFvHTF2UzTPp82x19UGIZVz3a4XRVuU6VecZUfw3y6k8zfLe/I2Z5nTQ2rbqVR1zjqcrJbq58/TFrVAIZV0yv0sFNjTo8HXLp25rmG+66+LlaaY6vIY3wu6i3j0rctrGruSA8ppOTrXLLY66LXr0JQmg8c+XVZrn0NOYXXbFmjbda8R0suS0zScqdCnHi2DKDfUrHQRoLdGyHRXXmY6NufW6zPC//8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/2gAKAgIQAxAAAADSBggAAAAABpME5oAaqQAAAAiwQMBWiQBgTUWmNDKgLgAaCLjRpNUiouagAaCLi2KgAVxUADQRcaAmDA0ycgDQRcaAE205uHAAwAy2TG1LqdMQAGAEaRo7SIvOoAAYAKs9BiEy8xADADLpIE1NtPXTlEDQ50RFSwZcF3kDhWCc1LTANclVTG2nPl0sRN3lKEtalgZdGvMr0wczpWOeyeuGXVtyhh2bc0aaYJ576YRoOoz325R49OvLl2PMeXRpzgybnS8BzrryzpeLWe+vPNVEbNPNaxdZTV5ijfXmVOM96khap1l//8QALBAAAgICAQMEAQQCAwEAAAAAAQIAAwQREhMhIgUQIDAyFCMxQSQzFTRAUP/aAAgBAQABBQD/AOK+Tj1wZ2OYMmqAhh/4j2F+bTSLs/KshvuMrdnHUfS5wREzXrsoyEsX6R88nKXHFlll82BOnomsylexYTc1opawFHqOnRg6/blX9FLbTZF2ksbc6p4dQ6D92fYI83Gj5a7yi+yo4uV1vtz8kXXKp42M2vbR0EM0dTY5WEcAgIB4tRaqsDsfT/d9nSpr4g2uTP5gpYxcVzBhuAmE2v0LxsBo+PYpbYnPSjhKQGnp9oer6XOh6lk84h4mw8ph4nOV41YAqQTisKiahAj1K0uw1MvpNZWvkK3KzCJqu+I+GTmWE2En2oU2Nj1BFA9jCYT7GFZmVAoYGO8Uq6UWdRPgPhm+KWeLdifT6AHUexhM37H3yF3XakWIhC4iNv6MgIarBxcfl6eO6+7QexPvYNq4iAqcPgTid8X4D4WryrzECureXp+lx29RAP8AyiQeq0GJkJbC0e5VBzqBD6jVB6iJXfXdL143psHFxzfUAFHwHx9Up6Vq92x6h+ltFNIZjaiNysxEBliaGQQZ0A5QqroKHldFYb1FOFtXjZi66fxHxyMWq811eVQHB6a3nQRYuHUDVStYu/h6+RqqFZGLUrfpE5Iup6igYVYnnijVP11A9Kk7XU0IB7XwRYFE4wATNPjQGsWsOPrP8UqKsygcUjOFiWl2luoRtks1YphMEykNq4VYSv7LaEtiNtms0H5WEMiL1TyuvYQ5LA0WIWVuxeK+wVLuiBB8h83IrvfyOTmFWV7raxRe0NFhSzHs2UtrXGy2BvsPRV+Ix/z+Y+eUmir+T4FVjLgVADEpWPjVAHG3BhIZ+lqmSdxTuYiEJ91iCxNaNfeD+Lg4hazminW4XGz3fH/cYdvoH0ZCGV2qZ1FAZlKtXuzmqh7gFa/ZBOsROkuNlV5FfzH0DKrusyqSsbJcyi/tZaBLro1xMRu9CcRUdnCvap8fIW0fIfPOyuC+nH/LYBlzMZ0cXOk67MHbcVWc044SLEOjk/8AYwiVNWYOasGH1W2rWruXPpSaSONy7Gqsj4NUGIilKwsAgjPofndQyIwbdyWAxL22tiP77+D2JWDc9gtZRCrCeln9rcJh7x4QYBBNy19LjjbggxdxrSZXl7Xl3TJcEMDN+7WHShQoNjwIoZf3GxQasibhjRpvuTC0tO5jUImMtSIoRGVK9PZQ3JDYhx7EZQCT+pAluXUhVy4e0cX4s9t9Etcyq7pqW/y0OwVjDsYVgSMIRqBObvZXw51ArfXo31cz5OeYJ3s2sCK7mgrKBW82yA0Qpc/DoR9s9F/FX6cosBAjCFYK9xk0DXLQFCaJrAIbJsFi2gwsDFsQp+oO3yTyGT3oyPC7JdmLMtHA8MVNW3VA1rSC70+dFXmS+O1GYrwNuH+RCNx9Kt5JanKpR3yxoKpNGOSOmFQKOYXZZfMiVDsqkrwJQqusZaw1raprdtt/sAKQoGqXisx7iwBg9s3LQPa11q8BGr0VQ7xyBWXZaObdRShLmvmSkp6ei2w6sB5bTiq3kdNOfLzJFBIUsal7WcOkynsJnXmqpcdnJo0647EvQeRp0tPUWm0P0SRzrI5EjkQDKAeK8yLcZ+fQaLj7qspArrSoNySBtmthq2kJOAKUvtAQBe9l12OnCWOxKcgXY6Y9m4dO2qrpCoE/pzsUNroNyoo/bqCIrq5lZdiilqrlARbKeRtGutorfpci4a6xMxbe+Xfwpot3at5Sg3Ha3kw38itvJ3tr1kWU8EQcApDAvqvn1KWK1DhVHyC0S9kdbj0L3OhZZptlf4KAsigWVvtbD4Pl2FjUmkyWPAISwGq1HlQPPk5OZY8V/FLtEZDGV3na5BCsxKov7YXvSP8AHvUFEAmto6tvHD7rVkfJqIPhopzZKnZ71ZruLmCpwoRuWMvmoBbIIaxR467aiLDoRVLMQiqOHOngKrXHTRzzFrFLGcxCQXJEyQCqkkDu1OuQYMwIAY+RY6xGdQlrSyzkQU2TWa+IBqRixFjF7H57JUBuVRC12MnTAXaFZyiPsqzWVKHNVnaVLc5t3TQnNU3YSyEuNTHP7QZeDa9mDcW8ZWPBnKGjzhq7LUQ1jugYF6lqPCmk9U1SurtVWgDrWkymDWYa6rylqL9KrQqqENaNFq8lpK0WVlK7OPM1gl0UA9iq+L2Pyxe1/wDQ/LMA4W9lP41fm/8ANZPTp/KwDhYB1agN5QHVMT8v6/pSeld/q0DfLowEIHTb8//EADcQAAEDAgMHAgUDAQkAAAAAAAEAAhEhMRJBUQMQIjAyYXGRoSBCcoGxE0BSMwQUI1BigqLB0f/aAAgBAQAGPwD/ACWHbVoK4SXKuJvdzSAgQQRqP2clUIc5UdhHZVe71V4Kh4FOywvkrFs6N0Ta1Jj9ibFylziVBqFPeDunsU0G8QiDuZBcGtAtqoeIag4EEHnGDDomdAhp+SblSEFh3AeUD4VFFzEldhuGF5BWF8B8TSzhqOa4NMsCkbIeSoO+dxHZFE6qB/JDQBStm6aAyTodUDy9o4XDTC1dqVcqIVlYq26yNNxUKpkr3RbNuVOlV+iB3K7olAldIVvhsjG7vuY75XGPXlf4OPTCWqS2J3NbqUByTuEotBrFu4Um4MHksdA64RGLcDyipCtKY9syGkmdQtptIhr8MDwKnkvDxwwnMkEjIrpgqeUQng5FSE9m14QWErYHVg5Lx2K8gFBHaOVGU3fMuHdUqMaoqsVE9v8AJqhFpdwuQAsByhFjJG7ZMNsKowSnvZsmva27iIai0bJhjRAxG4gp2HZkwCSsH92Y40s6br+kO8XHkIOati9VqOZLhWIBRpWSmjRoXEwFGGQCuFgHhUAG4qWiPBKxtbhOoWITOu7Z+VjqAhqSeZt+xxeqaew5YQLSodEcza7F4ptGAhNbpTdJXb4C3T4GsDolRzWzdplpFwtp2edwkwN1NrM5FELrRM1NSqHe0C6gc7aDXiTJtNVREtqZQqB5RD9o31RghylBpKBsSQEE7wOe1+tCsJRMmqFFn6qhM+V1O9VWSgIiFs2jIyp7Ivcav55ajIrKG6hooKruIUlNZ+xD2/dSCpJR3VUpxQAElOceoNKa8Un9gdmywBMrGxVcgCUTKiVE0QQJvCI1EIse4gBd+cWNPlbT6CiCpawlqgURncGtEqTU73kZlA6hFj76qQZ5Zk1hGagVW0fm52+XMRid1APgH1ICDe8p4kx+FIPFZQRK4XA/HLjCOEYRkcysAMuKyMlEckonRNIJr2U4M6o4ZkOFFDiQ7VSDB/kFG0FMnfDwepTnvOIzJJRDg5rE55AsuIRAmi2uzJ5MLETVwlGakO9iqEBPDnDJOLYBxGxRkOMdlIIPY0UtMaNKgsdIUN43aBEvNf45BQ6beAmuL4AIk5AKNnxQuMtaDU1lMBAEhYm2IQ5AGpQACfxDM+6MA2myB9RCkGJrHdOoDUpvCekLCbE5qQaWuumXIg9LG1K6XQE5okSImJqnSSXW3fp7WfqTXtOcDkSTCo20lQQREo9iVUFUcVes0HdOE5m9VfSwQJRo3qPzJx9rCSjU1IXlNA7ko6lyPDmE+ojAnVB0CxTLYBgIA0PwlxNAsRMD/pPmoRwAyVUlTE1RluRTB9O53nc63UU53c1KEubVxN0AT9gnGtz7IYaJwxG6zktRMWIPutYkJwNTeAhi+BrBXQIFwIEwAjDggAW2Gat7heqdByR7T7BNlvoncJvquk+qfR3UmjtQBMEFNpEHOi6sjkgACSqsAmawv6g6R8y2kYjLDYQjLppMJtsRcpxEmRU78LKvevml3aU0AUYCdEOA/YpxwPv2UkO9E2NoOnVS5k1CdLI6k3iiuaPG2/dUc1Pt1nMJsQ0EIUNAF0u9ghOEZWlAE00sECAKYk2lY0VGlAEZQiWbMNQkybIKSYARpV1uwXT0iPRPIHUYQ4RqulCWkUUGLAWVAAZbaieWucOE5ym1afIj8Lo/5JowOysQUCQ+pJ6UNbEmpV4oEBRVdmSq6oHE25CZwvzyVGH70QMehmyFAPJ1TmEk9rCiLVANXmE7anCP/ApIExqm1YieCg7hNGEfZyPDSgoZuUJNzmE3ibdPjtYpkOKNk0ltJTBhNk4ip82QOPKzU0guEkd1dx+6ZDR6dlM2chXM7nRM3C8iEHReqBGvsV4EINi5ATW1qhQ2TtSQNw7u/CYA4+qAmV0Dq8WUy4UOa6h9wjVlGu1QGCaZEJsnVfdNHcbmnynj/UEYFiE2hVinsLTqE6YFZ9UJJMUKADga1TQG0Fb6qIsPyiYuShLcpT+E0CqLAleAnnQgJt8yn1y3O8R67nNFgU0FxtNE3quFEHNCGi4ThAsDbQp1UKm6Jk0Epr9D7FNJNatKJAKawGt090iAYCe8nUoAQj9ghU1JW0M5AJxROFtXOKjDQRmvmEuVHhCCCApATmxmhWopVDiahJCgk+miLpOijitrCKHAK0Q4BVuigNAppmFOKrq6UWLM0CwtHYKjbmLLo9kTHeiAwi6Jg1cSIKHXnkmCctFRzblMaMmzRWcSj2/KgApwuU2j/RDgd7JjGsyBqVs3fpxM5o8Dbi5R6BTIIS83Kacbk4FzqHXVbYivCnTYJhe1s1gHRbMQ1M4RYlExYap58BN4nXJTBIPALhE4QYYbEhCQ4AABTx5/Km1+XQhUcPVTiHqjLpW1+lN8IeV/ZkxHyEUPKP1FP+pbVP8AIVvlav8Aah9IRT/rX2KHgJ/0oSPmX23WT6ZFP+or/8QAIREAAgICAgMAAwAAAAAAAAAAAAECERAxICESMEEyQFH/2gAIAQIBAT8A/QbovFifofNPlIs7O8Xhc3viub40LYuTxawmWhC5S0LitEdc302JYqzRHv0TQiyxEV6JaKxQxP0Jt23i0XhCnTpnXGmTXGKJJJ6GrFRRpWJt2W70N3xjS+kuxPpD2aROfdCk6G3TIJ0KDefFtjKdFvscnZ5OhxVijFJDrxZDZ3ZJUxK3i3Z/MVE8VRPeHpkas6J0RobVMVXj4xJ2hk5dnky3TFvHwokR3htqJFuzyY0nTKikilQqvD3iT7InRJKiMVY4okfEfBYf5CJbZHE9IhsZ/8QAJREAAgIBAwQDAAMAAAAAAAAAAAECESEDEDESIDJBIjBxUWGR/9oACAEDAQE/AO6vqSsrevoXe1XdEqykYKQ47crvXHbLZ/VY+B9yztTvkvI1YotDH3QdPamxc7+yfk13xykXZn+C2vRdknWfogy6FMbsZN/RBOxsQ5CyNJuhpp13JW0icVDpivXO1M6XsyempJNHS89ntFxTwRlbfbJ0Qk3HkUqeSTbzWNqTlS4JRUWkUkucsUGjja9pKT9EMWiSyyPEfwfLNPSSVt5ZOEXJ8kIq44RqNfH5Ic48N3upR01d3IVOm2WrdNFYWERjHGBxjfBHUfTGkT1JOTdkW3NWyfihNEXcUXSbOWY/xDfO3VNexzlfJpeOR+yPksEk+llMhF5Jp0kQi3NDUkmNMrKwNrP4e3k0oLpHFZwxLK+I7qRkXlyN2+TS5bsm30GcYRBJzXxJqNM6IkZyWEOcreRSlayO6eXtHxb2gvi2TwXK+WaU5dXJPUl0in/RAfkxcol7GR8H+7Q8ET520vJmp4oR/9k=" alt="Team Member Name" className="rounded-full w-32 h-32 mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold">Alex mahone</h3>
                            <p className="text-gray-500">Manager</p>
                        </div>
                        <div className="team-member bg-white shadow-lg rounded-full p-6 transition transform hover:-translate-y-2">
                            <img src="https://th.bing.com/th?id=OIP.hLTThhxHPeGqFQVjpD1-hwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" />
                            <h3 className="mt-4 text-xl font-semibold">Lex Brian</h3>
                            <p className="text-gray-500">Sales and Marketing</p>
                        </div>
                        <div className="team-member bg-white shadow-lg rounded-full p-6 transition transform hover:-translate-y-2">
                            <img src="https://th.bing.com/th?id=OIP.ys3eLvpN4dtxcQYmEzDF2wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"/>
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
