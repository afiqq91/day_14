//Excercise 2 completed
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // not logged in
    if (!token) {
        return <Navigate to="/login" />;
    }

    // logged in but not admin
    if (adminOnly && role !== "ADMIN") {
        return <Navigate to="/dashboard" />;
    }

    return children;
}

export default ProtectedRoute;