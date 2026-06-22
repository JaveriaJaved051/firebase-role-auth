import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Default route — login page pe bhejo */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public routes — koi bhi access kar sakta hai */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected — sirf "user" role wala */}
          <Route path="/user-dashboard" element={
            <PrivateRoute requiredRole="user">
              <UserDashboard />
            </PrivateRoute>
          } />

          {/* Protected — sirf "admin" role wala */}
          <Route path="/admin-dashboard" element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}