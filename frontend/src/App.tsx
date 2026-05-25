import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import ParticipatePage from './pages/ParticipatePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/"                 element={<HomePage />} />
        <Route path="/mappa"            element={<MapPage />} />
        <Route path="/storie"           element={<StoriesPage />} />
        <Route path="/storie/:slug"     element={<StoryDetailPage />} />
        <Route path="/partecipa"        element={<ParticipatePage />} />
        <Route path="/chi-siamo"        element={<AboutPage />} />
      </Routes>
    </SiteLayout>
  );
}
