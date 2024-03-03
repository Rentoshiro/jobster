import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return navigate("/landing");
  }
  return children;
}

export default ProtectedRoute;
