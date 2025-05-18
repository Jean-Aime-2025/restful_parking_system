import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import Requests from './pages/admin/Requests';
import UserDashboard from './pages/user/Dashboard';
import AdminSlots from './pages/admin/Slots';
import { AdminLayout } from './components/layout/admin-layout';
import UserLayout from './components/layout/user-layout';
import { ProtectedRoute } from './components/security/ProtectedRoute';
import NotFound from './pages/not-found/NotFound';
import Vehicles from './pages/user/Vehicles';
import UserRequests from './pages/user/Requests';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/slots"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminSlots />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Requests />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserLayout>
              <UserDashboard />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/vehicles"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Vehicles />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/requests"
        element={
          <ProtectedRoute>
            <UserLayout>
              <UserRequests />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
