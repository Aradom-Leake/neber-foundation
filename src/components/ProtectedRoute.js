import { Navigate } from "react-router-dom";
import { getCookie } from "./common/getCookie";
import Anauthorized from "../pages/Anauthorized";
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = getCookie("roles");
  if (!isLoggedIn) {
    return <Navigate to="/user/signin" replace />;
  }else if (isLoggedIn !== 'admin') {
    return <Anauthorized/>
  }
  return <>{children}</>;
};

export default ProtectedRoute;
