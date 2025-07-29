import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Login from "./Login/Login";
import Dashboard from './components/Dashboard/Dashboard';
import reportWebVitals from './reportWebVitals';

const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";

const router = createBrowserRouter([
  {
    path: "/",
    element: isLoggedIn() ? <Navigate to="/dashboard" /> : <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
