import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home"
import Navbar from "./Navbar";
import Profile from "../Profile/Profile"
import AuthPage from "../../pages/AuthPage"
import CoursePage from "../../pages/coursePage";
import UserCourses from "../UserCourses/UserCourses";
import Admin from "../Admin/Admin";

const ProtectedRoute = ({ isAdmin, children }) => {
    if (!isAdmin) {
        return <Navigate to="/" replace />
    }

    return children
}

const ReactRouter = () => {
    const [admin, setAdmin] = useState(false)

    const handleAdmin = (value) => {
        setAdmin(value)
    }

    return (
        <Router>
            <Navbar handleAdmin={handleAdmin} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mycourses" element={<UserCourses />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/course" element={<CoursePage />} />
                <Route path="/admin" element={
                    <ProtectedRoute isAdmin={admin}>
                        <Admin />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default ReactRouter