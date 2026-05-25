import { Routes, Route, Navigate } from 'react-router-dom';
import useAppStore from './store/useAppStore';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Opportunities from './pages/Opportunities';
import OpportunityDetail from './pages/OpportunityDetail';
import SPANCOP from './pages/SPANCOP';
import Alerts from './pages/Alerts';
import Calendar from './pages/Calendar';
import Emails from './pages/Emails';
import Files from './pages/Files';
import PoweringU from './pages/PoweringU';
import Champions from './pages/Champions';
import Settings from './pages/Settings';

function ProtectedRoute({ children }) {
  const currentUser = useAppStore((s) => s.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="opportunities/:id" element={<OpportunityDetail />} />
        <Route path="spancop" element={<SPANCOP />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="emails" element={<Emails />} />
        <Route path="files" element={<Files />} />
        <Route path="powering-u" element={<PoweringU />} />
        <Route path="champions" element={<Champions />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
