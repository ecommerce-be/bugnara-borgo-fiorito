import { Routes, Route } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import ParticipatePage from './pages/ParticipatePage';
import AboutPage from './pages/AboutPage';

// Admin
import { AdminLayout } from './admin/layout/AdminLayout';
import { RequireAuth } from './admin/components/RequireAuth';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';

/**
 * Top-level route map.
 *
 * BrowserRouter and QueryClientProvider live in main.tsx; here we only
 * declare the route tree itself.
 */
export default function App() {
  return (
    <Routes>
      {/* Admin routes (no SiteLayout, no public header/footer) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          </RequireAuth>
        }
      />

      {/* Public site routes */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/mappa" element={<MapPage />} />
        <Route path="/storie" element={<StoriesPage />} />
        <Route path="/storie/:slug" element={<StoryDetailPage />} />
        <Route path="/partecipa" element={<ParticipatePage />} />
        <Route path="/chi-siamo" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
