import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home"
import Navbar from "./Navbar";
import Profile from "../Profile"

const ReactRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default ReactRouter