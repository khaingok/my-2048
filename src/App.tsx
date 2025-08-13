import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScorePage from "./pages/ScorePage";



export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/score" element={<ScorePage />} />
    </Routes>
    <Footer />
    </Router>
  );
}
