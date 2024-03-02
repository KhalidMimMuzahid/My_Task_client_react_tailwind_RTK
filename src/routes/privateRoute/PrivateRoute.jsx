/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  // authentication info from context-api or redux-toolkit
  const { user, isLoading } = useSelector((state) => state.auth.value);

  // location
  const location = useLocation();

  if (isLoading) {
    // if authinfo is in loading state, then show loading component
    return (
      <div style={{ marginTop: "800px" }} className="text-center ">
        <div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (user) {
    //navigate to target page cause, user is logged in now.
    return children;
  } else {
    // navigate user to login page for authentication
    return (
      <div>
        <Navigate to="/signin" state={{ from: location }} replace></Navigate>
      </div>
    );
  }
};

export default PrivateRoute;
