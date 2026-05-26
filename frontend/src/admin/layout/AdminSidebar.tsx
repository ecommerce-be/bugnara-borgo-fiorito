import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUnreadCount } from '../hooks/useAdminApi';
import { SmallBloom } from '../../components/decorative/Botanical';

interface NavItem {
  to: string;
  label: string;
  icon: string;
  badge?: number;
}

export function AdminSidebar() {
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();
  const { data: unread } = useUnreadCount();

  const handleLogout = () => {
    clear();
    navigate('/admin/login');
  };

  const items: NavItem[] = [
    { to: '/admin',           label: 'Dashboard',     icon: '◇' },
    { to: '/admin/spots',     label: 'Spot fioriti',  icon: '✿' },
    { to: '/admin/stories',   label: 'Storie',        icon: '❦' },
    { to: '/admin/messages',  label: 'Messaggi',      icon: '✉', badge: unread?.count },
  ];

  return (
    <aside className="w-64 shrink-0 bg-paper border-r border-stone-deep/30 flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <Link to="/admin" className="px-6 py-6 border-b border-stone-deep/30 flex items-center gap-3 group">
        <SmallBloom className="w-7 h-7 text-bloom-deep transition-transform group-hover:rotate-12" />
        <div className="leading-none">
          <div className="font-display text-lg text-ink">Bugnara</div>
          <div className="font-sans text-[9px] uppercase tracking-eyebrow text-ink-faint mt-1">
            Pannello di gestione
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center justify-between gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                isActive
                  ? 'bg-ink text-paper'
                  : 'text-ink-soft hover:bg-paper-deep hover:text-ink'
              }`
            }
          >
            <span className="flex items-center gap-3">
              <span className="font-display text-base w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="bg-bloom-deep text-paper text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* External link to public site */}
      <div className="px-3 pb-3">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-xs uppercase tracking-eyebrow text-ink-faint hover:text-ink"
        >
          <span>↗</span>
          <span>Vai al sito pubblico</span>
        </Link>
      </div>

      {/* User box */}
      <div className="px-4 py-4 border-t border-stone-deep/30 bg-paper-soft">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-bloom/20 border border-bloom-deep/30 flex items-center justify-center text-bloom-deep font-display text-sm">
            {user?.displayName.charAt(0) ?? '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-ink truncate">
              {user?.displayName}
            </div>
            <div className="text-[10px] uppercase tracking-eyebrow text-ink-faint">
              {user?.role}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 w-full text-left text-xs uppercase tracking-eyebrow text-ink-faint hover:text-bloom-deep transition-colors"
        >
          ← Esci dal pannello
        </button>
      </div>
    </aside>
  );
}
