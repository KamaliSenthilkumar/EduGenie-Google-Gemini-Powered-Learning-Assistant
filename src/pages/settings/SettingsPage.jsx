import React, { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Palette,
  Shield,
  Check,
  Moon,
  Sun,
  Laptop
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const SettingsPage = () => {
  const { success } = useToast();

  // Settings State
  const [learningReminders, setLearningReminders] = useState(true);
  const [quizNotifications, setQuizNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [streakAlerts, setStreakAlerts] = useState(true);

  const [aiCreativity, setAiCreativity] = useState('Balanced');
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [codeBlockTheme, setCodeBlockTheme] = useState('Dark (One Dark)');

  const [analyticsOptIn, setAnalyticsOptIn] = useState(true);
  const [historyRetention, setHistoryRetention] = useState('Forever');

  const handleSavePreferences = () => {
    success('Settings and preferences successfully saved!');
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid #F1F5F9'
      }}
    >
      <div>
        <div style={{ fontSize: '0.925rem', fontWeight: 600, color: '#1E293B' }}>{label}</div>
        {description && <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>{description}</div>}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          width: '46px',
          height: '24px',
          borderRadius: '12px',
          backgroundColor: checked ? '#4F46E5' : '#CBD5E1',
          position: 'relative',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          padding: '2px'
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            transform: checked ? 'translateX(22px)' : 'translateX(0)',
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        />
      </button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '960px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings size={28} color="#64748B" />
          <span>Application Settings</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
          Configure system notifications, AI generation parameters, and visual interface preferences.
        </p>
      </div>

      {/* 1. Notifications Section */}
      <Card title="Notifications & Reminders" subtitle="Stay updated with your study schedule and goals">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ToggleSwitch
            label="Daily Study Reminder"
            description="Receive gentle alerts to maintain your study streak and complete daily goals"
            checked={learningReminders}
            onChange={setLearningReminders}
          />

          <ToggleSwitch
            label="Quiz & Evaluation Notifications"
            description="Alert when AI completes complex multi-question evaluation tasks"
            checked={quizNotifications}
            onChange={setQuizNotifications}
          />

          <ToggleSwitch
            label="Study Streak Safeguard"
            description="High-priority reminder 2 hours before midnight if your streak has not been saved"
            checked={streakAlerts}
            onChange={setStreakAlerts}
          />

          <ToggleSwitch
            label="Weekly Learning Digest Email"
            description="Receive a summary of quizzes completed and retention scores every Sunday"
            checked={weeklyDigest}
            onChange={setWeeklyDigest}
          />
        </div>
      </Card>

      {/* 2. Appearance & UI Preferences */}
      <Card title="Appearance & Experience" subtitle="Customize the visual ergonomics of EduGenie">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
              Interface Theme
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: '2px solid #4F46E5',
                  backgroundColor: '#EEF2FF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}
              >
                <Sun size={20} color="#4F46E5" />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#4F46E5' }}>Light (Default)</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Clean navy & indigo</div>
                </div>
              </div>

              <div
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1.5px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: 0.7
                }}
              >
                <Moon size={20} color="#64748B" />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>Dark Mode</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Coming soon</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
              AI Generation Tone
            </label>
            <select
              value={aiCreativity}
              onChange={(e) => setAiCreativity(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1.5px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '0.9rem'
              }}
            >
              <option value="Precise">Academic & Strict (Deterministic, concise)</option>
              <option value="Balanced">Balanced (Standard educational pedagogical tone)</option>
              <option value="Creative">Creative (Rich analogies, detailed stories)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* 3. Privacy & Data Preferences */}
      <Card title="Privacy & Data Control" subtitle="Manage how your notes and quiz responses are retained">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ToggleSwitch
            label="Learning Analytics Improvement"
            description="Allow anonymized quiz scores to improve model recommendations"
            checked={analyticsOptIn}
            onChange={setAnalyticsOptIn}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div>
              <div style={{ fontSize: '0.925rem', fontWeight: 600, color: '#1E293B' }}>Activity History Retention</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Time period before old quiz records are archived</div>
            </div>

            <select
              value={historyRetention}
              onChange={(e) => setHistoryRetention(e.target.value)}
              style={{
                width: 'auto',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                fontSize: '0.85rem'
              }}
            >
              <option value="90 Days">90 Days</option>
              <option value="1 Year">1 Year</option>
              <option value="Forever">Forever (Recommended)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '32px' }}>
        <Button variant="primary" size="lg" onClick={handleSavePreferences} icon={Check}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
