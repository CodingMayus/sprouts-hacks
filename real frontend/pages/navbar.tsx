"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Home, Target, Compass, Receipt, Settings, MessageSquare, Menu, ChevronLeft } from "lucide-react";

function SideBar({ isOpen, toggleSidebar }) {
  const username = "Username";
  const previousData = [
    { id: 1, title: "February Budget", date: "Feb 15, 2025" },
    { id: 2, title: "January Analysis", date: "Jan 30, 2025" },
    { id: 3, title: "2024 Financial Summary", date: "Dec 28, 2024" },
  ];

  return (
    <>
      {/* Overlay for mobile - closes sidebar when clicked */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-blue-600 text-white shadow-lg z-30 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden absolute top-4 right-4 p-1 rounded-full hover:bg-blue-700"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Profile Section */}
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-300 overflow-hidden mr-3">
              <Image width={40} height={40} src="/fishloading.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-medium">Hello {username}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-grow">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
                  <Home className="mr-3 w-5 h-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/goals" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
                  <Target className="mr-3 w-5 h-5" />
                  <span>Goals</span>
                </Link>
              </li>
              <li>
                <Link href="/explore" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
                  <Compass className="mr-3 w-5 h-5" />
                  <span>Explore</span>
                </Link>
              </li>
              <li>
                <Link href="/budgets" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
                  <Receipt className="mr-3 w-5 h-5" />
                  <span>Previous Budgets</span>
                </Link>
              </li>
            </ul>

            {/* Previous Data Section */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-2">Recent History</h3>
              <ul className="space-y-1">
                {previousData.map((item) => (
                  <li key={item.id}>
                    <Link href={`/history/${item.id}`} className="flex items-center p-2 text-sm rounded hover:bg-blue-700 transition-colors">
                      <MessageSquare className="mr-3 w-4 h-4" />
                      <div>
                        <span className="block">{item.title}</span>
                        <span className="text-xs text-blue-300">{item.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Settings and Logout */}
          <div className="mt-auto">
            <div className="border-t border-blue-500 pt-4 mb-2"></div>
            <Link href="/settings" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
              <Settings className="mr-3 w-5 h-5" />
              <span>Settings</span>
            </Link>
            <Link href="/logout" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors mt-2 text-sm">
              Logout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function Layout({ children }) {
  // Start with default state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Initialize sidebar state based on screen size
  useEffect(() => {
    // Set initial state based on screen size
    if (typeof window !== 'undefined') {
      setSidebarOpen(window.innerWidth >= 768);
      
      // Update state on resize
      const handleResize = () => {
        setSidebarOpen(window.innerWidth >= 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      {/* Sidebar Component */}
      <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "ml-0"}`}>
        {/* Navbar with toggle button */}
        <header className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10">
          <button 
            id="sidebar-toggle"
            onClick={toggleSidebar} 
            className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} className="text-blue-600" />
          </button>
          <h1 className="ml-4 text-xl font-bold text-blue-600">KOICASH</h1>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}