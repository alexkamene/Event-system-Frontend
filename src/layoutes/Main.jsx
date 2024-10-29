import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";



function Main() {
 
  
  return (


    <div className="px-[12px] max-w-screen-full h-full">
     
     
      
      <Navbar />
    
      <Outlet  className='mt-20'/>


      <Footer className='mt-20'/>
      

    
    
    </div>

 
  );
}

export default Main;
