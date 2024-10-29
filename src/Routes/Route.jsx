import { createBrowserRouter } from "react-router-dom";
import Main from "../layoutes/Main";



import AdminDashboard from "../Pages/Dashboards/AdminDashboard.jsx";
import Register from "../Pages/Register.jsx";
import Login from "../Pages/Login.jsx";
import EventRegistration from "../Pages/Dashboards/EventRegistration";
import RegisteredEvents from "../Pages/Dashboards/RegisterdEvents.jsx";
import OrganizerCreateEvents from "../Pages/Dashboards/OrganizerCreateEvents.jsx";
import ProtectedRoute from "../Routes/ProtectedRoute.jsx";
import ViewUsers from "../Pages/Dashboards/Organizers/ViewUsers";
import RegisteredUsers from "../Pages/Dashboards/Organizers/RegisterdUsers.jsx";
import ProfilePicture from "../Pages/Users/ProfilePicture.jsx";
import OrganizerProfile from "../Pages/Dashboards/Organizers/OrganizerProfile.jsx";
import Home from "../Pages/Home.jsx";
import About from "../Pages/About.jsx";
import UserDashboard from "../Pages/Dashboards/UserDashboard.jsx";
import OrganizerDashboard from "../Pages/Dashboards/OrganizerDashboard.jsx";
import AdminDashboard from "../Pages/Dashboards/AdminDashboard.jsx";







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
        <ProfilePicture/>
        
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