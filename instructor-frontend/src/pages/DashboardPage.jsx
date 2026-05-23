import { useNavigate } from "react-router-dom";

function DashboardPage() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        navigate("/login");
    };

    return (
        <div>

            <h1>Dashboard</h1>

            {
                token && (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )
            }

        </div>
    );
}

export default DashboardPage;