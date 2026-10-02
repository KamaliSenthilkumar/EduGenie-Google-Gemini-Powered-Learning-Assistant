import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Award,
  BookOpen,
  Flame,
  MessageSquare,
  Lightbulb,
  FileText,
  BrainCircuit,
  CheckCircle2,
  CalendarDays,
  History,
  TrendingUp,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import WeeklyProgressChart from '../../components/charts/WeeklyProgressChart';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ACTION_TILES = [
  {
    title: 'AI Tutor',
    description: 'Ask questions and learn with your personal AI tutor.',
    path: '/ai-tutor',
    icon: MessageSquare,
    gradient: 'var(--grad-tutor)',
    badge: 'Interactive'
  },
  {
    title: 'Explain a Topic',
    description: 'Understand difficult concepts with simple explanations.',
    path: '/explain',
    icon: Lightbulb,
    gradient: 'var(--grad-explain)',
    badge: 'Concepts'
  },
  {
    title: 'Generate Notes',
    description: 'Create structured study notes instantly.',
    path: '/notes',
    icon: FileText,
    gradient: 'var(--grad-notes)',
    badge: 'Revision'
  },
  {
    title: 'Generate Quiz',
    description: 'Practice with AI-generated questions.',
    path: '/quiz',
    icon: BrainCircuit,
    gradient: 'var(--grad-quiz)',
    badge: 'Practice'
  },
  {
    title: 'Evaluate Answer',
    description: 'Get AI feedback on your answers.',
    path: '/evaluate',
    icon: CheckCircle2,
    gradient: 'var(--grad-evaluate)',
    badge: 'Grading'
  },
  {
    title: 'Study Plan',
    description: 'Create a personalized learning schedule.',
    path: '/study-plan',
    icon: CalendarDays,
    gradient: 'var(--grad-study)',
    badge: 'Planner'
  },
  {
    title: 'Learning History',
    description: 'Review your previous learning activities.',
    path: '/history',
    icon: History,
    gradient: 'var(--grad-history)',
    badge: 'Archive'
  },
  {
    title: 'Progress',
    description: 'Track your learning performance and growth.',
    path: '/progress',
    icon: TrendingUp,
    gradient: 'var(--grad-progress)',
    badge: 'Analytics'
  }
];

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [statsRes, progRes, histRes] = await Promise.all([
          api.learning.getStats(),
          api.learning.getProgress(),
          api.learning.getHistory()
        ]);
        setStats(statsRes);
        setProgressData(progRes.weekly || []);
        setActivities(histRes || []);
      } catch (err) {
        console.error('Error loading dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  const getActivityIcon = (type) => {
    switch (type) {
      case 'Quiz':
        return { icon: BrainCircuit, color: '#F59E0B', bg: '#FEF3C7' };
      case 'Notes':
        return { icon: FileText, color: '#10B981', bg: '#DCFCE7' };
      case 'AI Tutor':
        return { icon: MessageSquare, color: '#8B5CF6', bg: '#F3F0FF' };
      case 'Evaluation':
        return { icon: CheckCircle2, color: '#EC4899', bg: '#FCE7F3' };
      case 'Study Plan':
        return { icon: CalendarDays, color: '#06B6D4', bg: '#E0F2FE' };
      default:
        return { icon: Sparkles, color: '#4F46E5', bg: '#EEF2FF' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Dashboard Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Welcome back, {firstName}! 👋
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748B', marginTop: '4px' }}>
            Here's your learning overview.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" size="md" onClick={() => navigate('/notes')} icon={FileText}>
            Quick Notes
          </Button>
          <Button variant="primary" size="md" onClick={() => navigate('/ai-tutor')} icon={Sparkles}>
            Ask AI Tutor
          </Button>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}
      >
        <StatCard
          icon={Brain}
          iconBg="#EEF2FF"
          iconColor="#4F46E5"
          value={stats?.quizzesCompleted?.value ?? '34'}
          label={stats?.quizzesCompleted?.label ?? 'Quizzes Completed'}
          sublabel={stats?.quizzesCompleted?.sublabel ?? 'vs last month'}
          trend={stats?.quizzesCompleted?.trend ?? '+12%'}
        />

        <StatCard
          icon={Award}
          iconBg="#DCFCE7"
          iconColor="#15803D"
          value={stats?.averageScore?.value ?? '88%'}
          label={stats?.averageScore?.label ?? 'Average Score'}
          sublabel={stats?.averageScore?.sublabel ?? 'Consistent high grade'}
          trend={stats?.averageScore?.trend ?? '+4.5%'}
        />

        <StatCard
          icon={BookOpen}
          iconBg="#E0F2FE"
          iconColor="#0284C7"
          value={stats?.topicsStudied?.value ?? '42'}
          label={stats?.topicsStudied?.label ?? 'Topics Studied'}
          sublabel={stats?.topicsStudied?.sublabel ?? '5 new this week'}
          trend={stats?.topicsStudied?.trend ?? '+8'}
        />

        <StatCard
          icon={Flame}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          value={stats?.studyStreak?.value ?? '12 Days'}
          label={stats?.studyStreak?.label ?? 'Study Streak'}
          sublabel={stats?.studyStreak?.sublabel ?? 'Personal record: 18'}
          trend={stats?.studyStreak?.trend ?? '🔥 Hot'}
        />
      </div>

      {/* Quick Actions (8 Feature Cards arranged 2 rows x 4 cards on desktop) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B' }}>
              Quick Actions
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Choose an AI learning capability to start studying
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '18px'
          }}
          className="dashboard-quick-actions-grid"
        >
          {ACTION_TILES.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <div
                key={i}
                onClick={() => navigate(tile.path)}
                className="edugenie-card"
                style={{
                  padding: '20px',
                  borderRadius: '18px',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '160px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Top subtle gradient bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: tile.gradient
                  }}
                />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: tile.gradient,
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        color: '#64748B',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      {tile.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', marginBottom: '4px' }}>
                    {tile.title}
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: '#64748B', lineHeight: 1.4 }}>
                    {tile.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#4F46E5',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    marginTop: '12px'
                  }}
                >
                  <span>Open</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Learning Progress Chart + Recent Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Progress Chart Card */}
        <Card
          title="Learning Progress"
          subtitle="Your daily performance and quiz scores over the week"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <WeeklyProgressChart data={progressData} loading={loading} />
        </Card>

        {/* Recent Activity Card */}
        <Card
          title="Recent Activity"
          subtitle="Your latest study sessions and quiz attempts"
          action={
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')} style={{ fontSize: '0.825rem' }}>
              View All History
            </Button>
          }
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {loading ? (
            <LoadingSpinner text="Fetching recent activity..." size={24} />
          ) : activities.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No recent activity"
              description="Complete a quiz or generate notes to start your activity log."
              actionLabel="Start a Quiz"
              onAction={() => navigate('/quiz')}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activities.slice(0, 5).map((act) => {
                const conf = getActivityIcon(act.type);
                const Icon = conf.icon;
                return (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #F1F5F9',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          backgroundColor: conf.bg,
                          color: conf.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#1E293B',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden'
                          }}
                        >
                          {act.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span>{act.topic}</span>
                          <span>•</span>
                          <span>{act.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      {act.score ? (
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            backgroundColor: '#DCFCE7',
                            color: '#15803D',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}
                        >
                          {act.score}
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: '#64748B'
                          }}
                        >
                          {act.status}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
