import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Lightbulb,
  FileText,
  BrainCircuit,
  CheckCircle2,
  CalendarDays,
  History,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Tutor', path: '/ai-tutor', icon: MessageSquare },
  { name: 'Explain a Topic', path: '/explain', icon: Lightbulb },
  { name: 'Generate Notes', path: '/notes', icon: FileText },
  { name: 'Generate Quiz', path: '/quiz', icon: BrainCircuit },
  { name: 'Evaluate Answer', path: '/evaluate', icon: CheckCircle2 },
  { name: 'Study Plan', path: '/study-plan', icon: CalendarDays },
  { name: 'Learning History', path: '/history', icon: History },
  { name: 'Progress', path: '/progress', icon: TrendingUp },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings }
];

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = () => {
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 15, 59, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 1040,
            display: 'block'
          }}
          className="mobile-backdrop"
        />
      )}

      <aside
        style={{
          width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          backgroundColor: 'var(--navy-sidebar)',
          color: '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1050,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '4px 0 25px rgba(0, 0, 0, 0.15)',
          overflowX: 'hidden'
        }}
        className={`edugenie-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            height: 'var(--topbar-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            padding: isCollapsed ? '0' : '0 20px',
            borderBottom: '1px solid var(--navy-sidebar-border)',
            flexShrink: 0
          }}
        >
          <div
            onClick={() => navigate('/dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
                flexShrink: 0
              }}
            >
              <GraduationCap size={22} />
            </div>

            {!isCollapsed && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.3px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Edu<span style={{ color: '#818CF8' }}>Genie</span>
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    color: '#6366F1',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}
                >
                  Gemini AI Powered
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                display: 'none', // Shown on desktop via media query or hover
                padding: '4px'
              }}
              title="Collapse sidebar"
              className="desktop-collapse-btn"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isCollapsed ? '16px 8px' : '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: isCollapsed ? '12px' : '10px 14px',
                  borderRadius: '12px',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s ease',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  position: 'relative',
                  boxShadow: isActive ? '0 4px 14px rgba(79, 70, 229, 0.35)' : 'none'
                })}
                title={isCollapsed ? item.name : undefined}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* User Profile Card & Logout at Bottom */}
        <div
          style={{
            padding: isCollapsed ? '12px 6px' : '16px',
            borderTop: '1px solid var(--navy-sidebar-border)',
            backgroundColor: '#070A28',
            flexShrink: 0
          }}
        >
          {!isCollapsed ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)'
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => {
                  navigate('/profile');
                  handleNavClick();
                }}
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128'}
                  alt={user?.name || 'User'}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                    {user?.name || 'Alex Morgan'}
                  </span>
                  <span style={{ fontSize: '0.725rem', color: '#818CF8' }}>
                    {user?.role || 'Student'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  padding: '6px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Log Out"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128'}
                alt={user?.name || 'User'}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => navigate('/profile')}
                title={user?.name}
              />
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  padding: '6px',
                  cursor: 'pointer'
                }}
                title="Log Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
