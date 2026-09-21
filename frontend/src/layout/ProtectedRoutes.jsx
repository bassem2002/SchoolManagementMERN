import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// useselector permet de selectionner valeur depuis store mta3i
// allowedoles = ['admin','teacher]
const ProtectedRoutes = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  // if user est null

  if (!user) {
    return <Navigate to="/connexion" state={{ from: location }} replace={true} />;
  }
  const { role } = user;
  if (!allowedRoles.includes(role)) {
    return (
      <Navigate to="/unauthorized" state={{ from: location }} replace={true} />
    );
  }
  return children;
};

export default ProtectedRoutes;

/*
let obj = {
  name: "bassem",
  age: 25,
};

const { name, age } = obj;
*/
// console.log(name, age); // bassem 25
