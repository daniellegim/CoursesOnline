import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home"
import Navbar from "./Navbar";
import Profile from "../Profile/Profile"
import AuthPage from "../../pages/AuthPage"
import UserCourses from "../UserCourses/UserCourses";
import Admin from "../Admin/Admin";

const ReactRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mycourses" element={<UserCourses />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </Router>
    );
}

export default ReactRouter