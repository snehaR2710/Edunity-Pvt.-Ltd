import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ allowedRoles }) {
  console.log("allowedRoles", allowedRoles);
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  const location = useLocation();
  // allowedRoles.find((myRole) => myRole === role)
  // allowedRoles.find((myrole) => console.log(myrole === role))
  console.log( role);

  // && allowedRoles.find((myRole) => myRole === role)

  return isLoggedIn  ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
