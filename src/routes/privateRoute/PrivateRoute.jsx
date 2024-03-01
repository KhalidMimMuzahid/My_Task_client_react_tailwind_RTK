// import { Navigate, useLocation } from "react-router";
// // import { AuthContext } from "../../contexts/UserProvider/UserProvider";

// const PrivateRoute = ({ children }) => {
//   // authentication info from context-api or redux-toolkit
//   const { user, isLoading } = //useContext(AuthContext);

//   // location
//   const location = useLocation();

//   if (isLoading) { // if authinfo is in loading state, then show loading component
//     return (
//       <div style={{ marginTop: "800px" }} className="text-center ">
//         <div>
//           <span>Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (user) {
//     //navigate to target page cause, user is logged in now.
//     return children;
//   } else {
//     // navigate user to login page for authentication
//     return (
//       <div>
//         <Navigate to="/login" state={{ from: location }} replace></Navigate>
//       </div>
//     );
//   }
// };

// export default PrivateRoute;
