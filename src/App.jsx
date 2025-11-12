import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/projectroute";
import Admin from "./components/adminpage/admin";
import Dashboard from "./components/website/Home";
import Signup from "./components/signup";
import Login from "./components/login";
import NotFound from "./components/routenotfound";
import EditProfile from './components/website/editProfile'
import Layout from "./components/website/layout"; // 👈 new layout import
import MyProfile from "./components/profile/profilefetch"; // 👈 new layout import

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Wrap your public pages inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<div className="container mt-5"><h2>Our Services</h2></div>} />
          <Route path="/about" element={<div className="container mt-5"><h2>About Us</h2></div>} />
          <Route path="/contact" element={<div className="container mt-5"><h2>Contact Page</h2></div>} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
          <Route
          path="dashboard/index"
          element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
