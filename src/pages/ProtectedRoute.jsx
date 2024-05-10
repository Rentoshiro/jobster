import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/landing");
    }
  }, [user, navigate]);
  return children;
}

export default ProtectedRoute;
