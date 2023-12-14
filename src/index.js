import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuardedRoute from "./components/utils/GuardedRoute";
import NeedsRegistration from "./components/utils/NeedsRegistration";
import Home from "./components/Home";
import CoinInfo from "./components/coinInfo/CoinInfo";
import Login from "./components/registration/Login";
import CustomersPage from "./components/pages/CustomersPage";
import RegisterPage from "./components/pages/RegisterPage";
import Portfolio from "./components/portfolio/Portfolio";
import LogOut from "./components/registration/LogOut";
import reportWebVitals from './reportWebVitals';
import Swap from "./components/swap/Swap";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Portfolio" element={<Portfolio></Portfolio>} />
        <Route path="/coinInfo/:coin" element={<CoinInfo />} />
        <Route
        path="/Swap"
        element={
          <GuardedRoute condition={NeedsRegistration()}>
            {" "}
            <Swap />{" "}
          </GuardedRoute>
        }
      />
        <Route path="/History" element={<CustomersPage />}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/LogOut" element={<LogOut />} />
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// 
reportWebVitals();
