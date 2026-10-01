import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, User, Settings, LogOut, Sparkles, Check, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ onToggleMobile, isCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    { id: 1, title: 'Study Streak Saved! 🔥', message: 'You kept your 12-day streak alive today.', time: '10m ago', unread: true },
    { id: 2, title: 'Quiz Evaluated 🎯', message: 'You scored 90% on Python Functions.', time: '2h ago', unread: true },
    { id: 3, title: 'New AI Study Plan Ready', message: '14-day Full-Stack roadmap is ready.', time: 'Yesterday', unread: false }
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/history?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 990,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
      }}
      className="edugenie-topbar"
    >
      {/* Left: Mobile trigger & Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleMobile}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            borderRadius: '8px',
            color: '#1E293B',
            cursor: 'pointer',
            display: 'none'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>

        <div className="topbar-greeting">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Welcome back, {firstName}! 👋
          </h2>
          <p style={{ fontSize: '0.825rem', color: '#64748B', marginTop: '2px' }}>
            Continue your learning journey and improve your skills.
          </p>
        </div>
      </div>

      {/* Right: Search, Notifications, Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="topbar-search-form" style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search topics, notes, quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '9px 14px 9px 38px',
              borderRadius: '20px',
              border: '1.5px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              fontSize: '0.875rem',
              width: '240px',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.width = '290px';
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.borderColor = 'var(--primary)';
            }}
            onBlur={(e) => {
              e.target.style.width = '240px';
              e.target.style.backgroundColor = '#F8FAFC';
              e.target.style.borderColor = '#E2E8F0';
            }}
          />
        </form>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: showNotifications ? '#EEF2FF' : '#F8FAFC',
              border: '1px solid #E2E8F0',
              color: showNotifications ? '#4F46E5' : '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            aria-label="View notifications"
          >
            <Bell size={20} />
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#EF4444'
              }}
            />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '50px',
                width: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-dropdown)',
                border: '1px solid #E2E8F0',
                padding: '14px',
                zIndex: 1000,
                animation: 'fadeIn 0.2s ease-out'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B' }}>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: '#4F46E5', fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      backgroundColor: n.unread ? '#F8FAFC' : 'transparent',
                      borderLeft: n.unread ? '3px solid #4F46E5' : '3px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>{n.title}</span>
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{n.time}</span>
                    </div>
                    <p style={{ fontSize: '0.775rem', color: '#64748B', marginTop: '2px' }}>{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Menu */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              padding: '4px 6px',
              borderRadius: '24px',
              transition: 'background 0.2s'
            }}
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128'}
              alt={user?.name || 'User Avatar'}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #EEF2FF',
                boxShadow: '0 2px 8px rgba(79, 70, 229, 0.15)'
              }}
            />
          </div>

          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '52px',
                width: '220px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-dropdown)',
                border: '1px solid #E2E8F0',
                padding: '8px',
                zIndex: 1000,
                animation: 'fadeIn 0.2s ease-out'
              }}
            >
              <div style={{ padding: '10px', borderBottom: '1px solid #F1F5F9', marginBottom: '6px' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>{user?.name}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/profile');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: 'none',
                  border: 'none',
                  color: '#334155',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <User size={16} color="#64748B" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/settings');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: 'none',
                  border: 'none',
                  color: '#334155',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Settings size={16} color="#64748B" />
                <span>Settings</span>
              </button>

              <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '4px 0' }} />

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                  navigate('/login');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: 'none',
                  border: 'none',
                  color: '#EF4444',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <LogOut size={16} color="#EF4444" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
