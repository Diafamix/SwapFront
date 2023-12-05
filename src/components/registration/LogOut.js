import React from "react";
import { Navigate } from 'react-router-dom';

function LogOut() {

    sessionStorage.clear("username")
    sessionStorage.clear("password")

    return (<Navigate to='/'/>)
  }
  
  export default LogOut;
  