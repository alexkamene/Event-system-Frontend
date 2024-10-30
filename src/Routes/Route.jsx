import { createBrowserRouter } from "react-router-dom";
import Main from "../layoutes/Main";
import Home from "../Pages/Dashboards/DashboardsComponents/Home.jsx";
import About from "../Pages/Dashboards/DashboardsComponents/About.jsx";
import UserDashboard from "../Pages/Dashboards/DashboardsComponents/UserDashboard.jsx";
import OrganizerDashboard from "../Pages/Dashboards/DashboardsComponents/OrganizerDashboard.jsx";
import ProfilePage from "../Pages/Dashboards/Organizers/OrganizerProfile.jsx";
import OrganizerProfile from "../Pages/Dashboards/Organizers/OrganizerProfile.jsx";
import AdminDashboard from "../Pages/Dashboards/DashboardsComponents/AdminDashboard.jsx";
import EventRegistration from "../Pages/Dashboards/DashboardsComponents/EventRegistration.jsx";
import ProtectedRoute from "../Routes/ProtectedRoute.jsx";

import OrganizerCreateEvents from "../Pages/Dashboards/DashboardsComponents/OrganizerCreateEvents.jsx";
import ViewUsers from "../Pages/Dashboards/Organizers/ViewUsers.jsx";
import RegisteredUsers from "../Pages/Dashboards/Organizers/RegisterdUsers.jsx";
import Register from "../Pages/Dashboards/DashboardsComponents/Register.jsx";
import Login from "../Pages/Dashboards/DashboardsComponents/Login.jsx";
import RegisteredEvents from "../Pages/Dashboards/DashboardsComponents/RegisteredEvents.jsx";











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
          <OrganizerDashboard/>
          
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