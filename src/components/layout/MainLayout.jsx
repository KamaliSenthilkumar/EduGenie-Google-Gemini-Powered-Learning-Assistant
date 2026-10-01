import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          marginLeft: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="edugenie-content-wrapper"
      >
        <Topbar
          isCollapsed={isCollapsed}
          onToggleMobile={() => setIsMobileOpen(!isMobileOpen)}
        />

        <main
          style={{
            flex: 1,
            padding: '32px 32px 48px 32px',
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
          className="edugenie-main-content"
        >
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .edugenie-content-wrapper {
            margin-left: 0 !important;
          }
          .edugenie-sidebar {
            transform: translateX(-100%);
          }
          .edugenie-sidebar.mobile-open {
            transform: translateX(0);
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .desktop-collapse-btn {
            display: none !important;
          }
          .edugenie-main-content {
            padding: 20px 16px 36px 16px !important;
          }
          .topbar-search-form {
            display: none;
          }
          .topbar-greeting h2 {
            font-size: 1.05rem !important;
          }
          .topbar-greeting p {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
