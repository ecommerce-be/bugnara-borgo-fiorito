import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Top-level layout wrapping all public pages.
 *
 * Used as a "layout route" in App.tsx:
 *   <Route element={<SiteLayout />}>
 *     <Route path="/" element={<HomePage />} />
 *     ...
 *   </Route>
 *
 * React Router renders the matched child route in place of <Outlet />.
 */
export function SiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
