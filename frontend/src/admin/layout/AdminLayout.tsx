import type { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-soft flex">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="p-8 md:p-10 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
