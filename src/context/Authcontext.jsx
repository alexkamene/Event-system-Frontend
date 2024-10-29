import { createContext, useEffect, useState, useContext } from "react";

// Create the Auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        loading
        if (token) {
            // Retrieve user ID and role from localStorage
            const userId = localStorage.getItem('userId');
            const userRole = localStorage.getItem('role');

            // Set user state with the retrieved values
            setUser({
                id: userId,
                role: userRole,
            });
        }

        setLoading(false); // Update loading state after check
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId'); // Optional: clear userId
        localStorage.removeItem('role'); // Optional: clear role
        setUser(null); // Clear user state
    };

    // Determine if the user is an admin or organizer
  
    const isAdmin = user?.role === "admin";
    const isOrganizer = user?.role === "organizer";


    // Context value to be provided
    const value = {
        user,
        loading,
        isAdmin,
        isOrganizer,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Only render children when loading is false */}
        </AuthContext.Provider>
    );
};

// Export the Auth context and custom hook

export default AuthContext;
