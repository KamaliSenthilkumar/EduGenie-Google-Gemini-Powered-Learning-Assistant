import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Award,
  BookOpen,
  Flame,
  BrainCircuit,
  Clock,
  Target,
  BarChart3,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { api } from '../../services/api';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import WeeklyProgressChart from '../../components/charts/WeeklyProgressChart';
import TopicDistributionChart from '../../components/charts/TopicDistributionChart';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProgressPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsRes, progRes] = await Promise.all([
          api.learning.getStats(),
          api.learning.getProgress()
        ]);
        setStats(statsRes);
        setProgressData(progRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px 0' }}>
        <LoadingSpinner text="Computing comprehensive learning analytics..." size={32} />
      </div>
    );
  }

  const weeklyData = progressData?.weekly || [];
  const topics = progressData?.topicDistribution || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TrendingUp size={28} color="#EAB308" />
          <span>Progress & Analytics</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
          Track your learning trajectory, retention metrics, and mastery levels across study modules.
        </p>
      </div>

      {/* 4 Key Performance Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}
      >
        <StatCard
          icon={Award}
          iconBg="#DCFCE7"
          iconColor="#15803D"
          value={stats?.averageScore?.value ?? '88%'}
          label="Average Score"
          sublabel="Across all attempted quizzes"
          trend="+4.5%"
        />

        <StatCard
          icon={BrainCircuit}
          iconBg="#EEF2FF"
          iconColor="#4F46E5"
          value={stats?.quizzesCompleted?.value ?? '34'}
          label="Quizzes Completed"
          sublabel="12 quizzes this month"
          trend="+12%"
        />

        <StatCard
          icon={BookOpen}
          iconBg="#E0F2FE"
          iconColor="#0284C7"
          value={stats?.topicsStudied?.value ?? '42'}
          label="Topics Studied"
          sublabel="8 chapters finished"
          trend="+8"
        />

        <StatCard
          icon={Flame}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          value={stats?.studyStreak?.value ?? '12 Days'}
          label="Study Streak"
          sublabel="Consistent daily practice"
          trend="🔥 Active"
        />
      </div>

      {/* Charts Grid: Weekly Learning Activity + Topic Distribution */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Weekly Progress Chart */}
        <Card
          title="Weekly Learning Performance"
          subtitle="Daily retention scores and active hours spent"
        >
          <WeeklyProgressChart data={weeklyData} />
        </Card>

        {/* Topic Distribution */}
        <Card
          title="Subject & Topic Distribution"
          subtitle="Time allocation and completed items per domain"
        >
          <TopicDistributionChart topics={topics} />
        </Card>
      </div>

      {/* Overall Mastery & Milestone Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Academic Milestones */}
        <Card title="Current Learning Goals" subtitle="Milestones set for this semester">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>Weekly Study Hours Goal</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4F46E5' }}>11.5 / 15 hrs (77%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '77%', height: '100%', backgroundColor: '#4F46E5', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>Python & DSA Mastery Target</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10B981' }}>88 / 100% (88%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '88%', height: '100%', backgroundColor: '#10B981', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>AI Study Streak Target</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F59E0B' }}>12 / 21 Days (57%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '57%', height: '100%', backgroundColor: '#F59E0B', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Study Insights from Gemini */}
        <Card
          title="AI Learning Insights"
          subtitle="Automated study suggestions based on your quiz patterns"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={18} color="#22C55E" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
                <strong>Strength in Algorithms:</strong> Your Binary Trees and Recursion scores consistently exceed 90%.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Target size={18} color="#4F46E5" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
                <strong>Recommended Practice:</strong> Review SQL query optimization and database indexing to boost your Database Systems grade.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Clock size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
                <strong>Optimal Study Window:</strong> You achieve your highest retention when studying between 2:00 PM and 4:30 PM.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
