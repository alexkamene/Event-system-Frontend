import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from 'react-icons/fa'; 
import UploadImage from "../../Images/UploadImage";


const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    profilePicture: "",
    password: "",
    backgroundInfo: "",
    createdAt: "",
    role: ""
  });
  const [events, setEvents] = useState([]); // New state for events
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showEditFields, setShowEditFields] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // State for the image URL

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

      try {
        const profileResponse = await axios.get("https://event-management-system-backend-dtrl.onrender.com/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo({
          name: profileResponse.data.name,
          email: profileResponse.data.email,
          profilePicture: profileResponse.data.profilePicture,
          backgroundInfo: profileResponse.data.backgroundInfo || "",
          createdAt: profileResponse.data.createdAt,
          role: profileResponse.data.role || "User",
        });

        // Fetch user events
        const eventsResponse = await axios.get("https://event-management-system-backend-dtrl.onrender.com/events-organizer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(eventsResponse.data); // Set events data
      } catch (error) {
        toast.error("Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "https://event-management-system-backend-dtrl.onrender.com/updateprofile",
        {
          name: userInfo.name,
          email: userInfo.email,
          profilePicture: imageUrl || userInfo.profilePicture,
          backgroundInfo: userInfo.backgroundInfo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  const toggleEditFields = () => {
    setShowEditFields(!showEditFields);
  };

  return (
    <div className="flex flex-col  mt-24 bg-gray-50 px-4">
      <ToastContainer position="top-right" autoClose={5000} />
      <h2 className="text-3xl font-bold mb-4">Your Profile</h2>
      {loading ? (
        <p><span className="loading loading-dots loading-xs"></span>
<span className="loading loading-dots loading-sm"></span>  Loading profile...</p>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center w-full  bg-white shadow-lg rounded-lg p-6">
          {/* Profile Picture and Info */}
          <div className="w-full md:w-1/3 text-center p-4 border-r">
            <img
              src={userInfo.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-40 h-40 rounded-full mx-auto mb-4 shadow-md"
            />
            <h3 className="text-2xl font-bold mb-2">{userInfo.name}</h3>
            <p className="text-gray-600">{userInfo.email}</p>
            <p className="text-gray-600 mt-2">{userInfo.backgroundInfo}</p>
            <p className="text-gray-400 text-sm mt-6">
              Member Since: {new Date(userInfo.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Role: <strong>{userInfo.role}</strong>
            </p>
            <button
              onClick={toggleEditFields}
              className="bg-orange-500 text-white py-2 px-4 rounded mt-4 w-full flex items-center justify-center"
            >
              <FaEdit className="mr-2" />
              {showEditFields ? "Hide Edit Fields" : "Edit Profile"}
            </button>
          </div>

          {/* Events Section */}
          <div className="w-full md:w-2/3 text-left p-4">
  <h3 className="text-xl font-semibold mb-2">Events Created</h3>
  {events.length > 0 ? (
    <div>
      <p className="text-gray-700">
        Total Events Created:{" "}
        <span className="text-green-400 font-bold">{events.length}</span>
      </p>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Event Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Venue</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className="py-2 px-4 border-b border-gray-200">{event.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{event.venue || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p className="text-gray-700">😢No events Created yet.</p>
  )}
</div>

        

          {/* Edit Profile Form */}
          {showEditFields && (
            <form
              className="w-full md:w-2/3 p-6 flex flex-col"
              onSubmit={handleProfileUpdate}
            >
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Edit Profile</h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full py-2 px-4 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full py-2 px-4 border rounded"
                  required
                />
              </div>
              <UploadImage setImageUrl={setImageUrl} />
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Background Information
                </label>
                <textarea
                  name="backgroundInfo"
                  value={userInfo.backgroundInfo}
                  onChange={handleInputChange}
                  className="input input-bordered w-full py-2 px-4  h-28 border rounded"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
