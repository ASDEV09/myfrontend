import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(-1);
    }
    return (
        <div className="text-center mt-5">
            <h1 className="display-4 text-danger">404 - Page Not Found</h1>
            <p className="lead">Oops! The page you’re looking for doesn’t exist.</p>
            <button onClick={handleNavigation} className="btn btn-primary mt-3">
                Go Back
            </button>
        </div>
    );
}

export default NotFound;
