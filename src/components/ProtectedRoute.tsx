import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  let isValid = false;

  if (token) {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        isValid = true;
      } else {
        localStorage.removeItem("token");
      }
    } catch {
      localStorage.removeItem("token");
    }
  }

  return isValid ? <>{children}</> : <Navigate to="/login" replace />;
}