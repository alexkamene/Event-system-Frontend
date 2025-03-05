import { createBrowserRouter } from "react-router-dom";
import Main from "../layoutes/Main";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import UserDashboard from "../pages/Dashboards/UserDashboard.jsx";
import OrganizerDashboard from "../pages/Dashboards/OrganizerDashboard.jsx";
import ProfilePage from "../pages/Users/ProfilePicture.jsx";

import AdminDashboard from "../pages/Dashboards/AdminDashboard.jsx";
import EventRegistration from "../pages/Dashboards/EventRegistration.jsx";
import ProtectedRoute from "../Routes/ProtectedRoute.jsx";

import OrganizerCreateEvents from "../pages/Dashboards/OrganizerCreateEvents.jsx";
import ViewUsers from "../pages/Dashboards/Organizers/ViewUsers.jsx";
import RegisteredUsers from "../pages/Dashboards/Organizers/RegisterdUsers.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import RegisteredEvents from "../pages/Dashboards/RegisterdEvents.jsx";
import OrganizerProfile from "../pages/Dashboards/OrganizerProfile.jsx";












export const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    

    children: [
{
  path: "/",
    element: <Home/>,
},
{
  path: "/about",
    element: <About/>,
},


      {
        path: 'dashboard/user',
        element: <UserDashboard/>,
    },
    {
        path: 'dashboard/organizer',
        element:(<ProtectedRoute requiredRole="organizer">
          <OrganizerDashboard />
          
              </ProtectedRoute>) 
    },
    {
      path: 'dashboard/user/Profile',
      element:(<ProtectedRoute requiredRole="user">
        <ProfilePage/>
        
            </ProtectedRoute>) 
  },
  {
    path: 'dashboard/Organizer/Profile',
    element:
      <OrganizerProfile/>
    
},
    {
        path: '/dashboard/admin',
        element: <AdminDashboard/>,
    },
    {
      path: "/events/register/:id",  // Ensure this path matches the Link in EventItem
      element: <EventRegistration/>, // Render the EventRegistration component
    },
    {
      path: "/registered-events",  // Ensure this path matches the Link in EventItem
      element: <RegisteredEvents/>, // Render the EventRegistration component
    },{
    path: "/organizer-createEvents",  // Ensure this path matches the Link in EventItem
    element:(<ProtectedRoute requiredRole="organizer">
<OrganizerCreateEvents/>

    </ProtectedRoute>) , // Render the EventRegistration component
  },


{
    path: "/organizer-ViewUsers",  // Ensure this path matches the Link in EventItem
    element:(<ProtectedRoute requiredRole="organizer">
<ViewUsers/>

    </ProtectedRoute>) , // Render the EventRegistration component
  },

// 
  {
path: "/organizer-event/:id",  // Ensure this path matches the Link in EventItem
element:(<ProtectedRoute requiredRole="organizer">
<RegisteredUsers/>

</ProtectedRoute>) , // Render the EventRegistration component
},
,

    
     { path: 'Register',
      element: <Register/>},
     { path: '/login',
      element: <Login/>},

    ]
  }
  


]);


export default route;