"use client";

import Link from "next/link";
import { useEffect, useState, ReactNode } from "react";

type UserRole = "reader" | "writer" | "admin";

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <div className="p-6">Unauthorized</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white border-b">
        <h2 className="font-bold">
          Dashboard <span className="text-orange-600">({user.role})</span>
        </h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="border px-3 py-2 rounded"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40 inset-y-0 left-0 w-64 bg-white border-r p-6
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="space-y-3">
          <Link href="/dashboard" onClick={() => setSidebarOpen(false)} className="block px-3 py-2 bg-gray-100 rounded">
            Home
          </Link>

          {user.role === "writer" && (
            <>
              <Link href="/dashboard/writer" onClick={() => setSidebarOpen(false)} className="block px-3 py-2 hover:bg-gray-100 rounded">
                Writer Panel
              </Link>
              <Link href="/dashboard/writer/create" onClick={() => setSidebarOpen(false)} className="block px-3 py-2 hover:bg-gray-100 rounded">
                Create Post
              </Link>
            </>
          )}

          {user.role === "admin" && (
            <>
              <Link href="/dashboard/admin" onClick={() => setSidebarOpen(false)} className="block px-3 py-2 hover:bg-gray-100 rounded">
                Admin Panel
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
