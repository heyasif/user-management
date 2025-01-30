import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import DashboardLayout from "./layouts/DashboardLayout";

function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center text-2xl text-gray-600">
      404 - Page Not Found
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route
          path="/users"
          element={
            <DashboardLayout>
              <UsersPage />
            </DashboardLayout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
