import { createBrowserRouter } from "react-router-dom";
import Main from "../layoutes/Main";
import Home from "../Pages/Dashboards/DashboardsComponents/Home";
import About from "../Pages/Dashboards/DashboardsComponents/About";
import UserDashboard from "../Pages/Dashboards/DashboardsComponents/UserDashboard";
import OrganizerDashboard from "../Pages/Dashboards/DashboardsComponents/OrganizerDashboard";
import ProfilePage from "../Pages/Dashboards/Organizers/OrganizerProfile";
import OrganizerProfile from "../Pages/Dashboards/Organizers/OrganizerProfile";
import AdminDashboard from "../Pages/Dashboards/DashboardsComponents/AdminDashboard";
import EventRegistration from "../Pages/Dashboards/DashboardsComponents/EventRegistration";
import ProtectedRoute from "../Routes/ProtectedRoute";

import OrganizerCreateEvents from "../Pages/Dashboards/DashboardsComponents/OrganizerCreateEvents";
import ViewUsers from "../Pages/Dashboards/Organizers/ViewUsers";
import RegisteredUsers from "../Pages/Dashboards/Organizers/RegisterdUsers";
import Register from "../Pages/Dashboards/DashboardsComponents/Register";
import Login from "../Pages/Dashboards/DashboardsComponents/Login";
import RegisteredEvents from "../Pages/Dashboards/DashboardsComponents/RegisteredEvents";











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