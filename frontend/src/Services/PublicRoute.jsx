import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getHomeRoute } from "../Components/Header/navConfig";

const PublicRoute = ({ children }) => {
    const token = useSelector((state) => state.jwt);
    const user = useSelector((state) => state.user);
    if (token) {
        return <Navigate to={getHomeRoute(user?.accountType)} replace />;
    }
    return children;
}

export default PublicRoute;
