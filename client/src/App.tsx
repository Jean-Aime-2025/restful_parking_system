import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import Requests from './pages/admin/Requests';
import UserDashboard from './pages/user/Dashboard';
import UserSlots from './pages/user/Slots';
import AdminSlots from './pages/admin/Slots';
import { AdminLayout } from './components/layout/admin-layout';
import UserLayout from './components/layout/user-layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/slots"
        element={
          <AdminLayout>
            <AdminSlots />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <AdminLayout>
            <Requests />
          </AdminLayout>
        }
      />
      <Route
        path="/user"
        element={
          <UserLayout>
            <UserDashboard />
          </UserLayout>
        }
      />
      <Route
        path="/user/slots"
        element={
          <UserLayout>
            <UserSlots />
          </UserLayout>
        }
      />
    </Routes>
  );
}

export default App;
