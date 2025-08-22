import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from './components/Dashboard/Dashboard';
import reportWebVitals from './reportWebVitals';
import ContextAPI from './components/Dashboard/ContextAPI';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextAPI>
      <RouterProvider router={router} />
    </ContextAPI>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
