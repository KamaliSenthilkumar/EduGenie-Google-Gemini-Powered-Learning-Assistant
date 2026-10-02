import React, { useState } from 'react';
import {
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  RotateCw,
  Bookmark,
  Target,
  Layers,
  Calendar,
  CheckSquare
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const StudyPlanPage = () => {
  const [subject, setSubject] = useState('Full-Stack Web Development');
  const [topics, setTopics] = useState('React, Node.js, Express, MongoDB, REST APIs, Authentication, State Management');
  const [days, setDays] = useState(7);
  const [dailyHours, setDailyHours] = useState(2);
  const [goal, setGoal] = useState('Job Interview Preparation');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [saved, setSaved] = useState(false);

  const { success, info } = useToast();

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const data = await api.ai.studyPlan({
        subject,
        topics,
        days: parseInt(days, 10),
        dailyHours,
        goal
      });
      setPlan(data);
      success('Personalized study plan created!');

      api.learning.saveActivity({
        type: 'Study Plan',
        title: `Plan: ${subject} (${days} Days)`,
        topic: subject,
        score: null,
        status: 'In Progress'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (dayIndex, taskIndex) => {
    if (!plan) return;
    const newDays = [...plan.days];
    const targetDay = { ...newDays[dayIndex] };
    const targetTasks = [...targetDay.tasks];

    targetTasks[taskIndex] = {
      ...targetTasks[taskIndex],
      done: !targetTasks[taskIndex].done
    };

    targetDay.tasks = targetTasks;
    // Check if all tasks in day are done
    targetDay.completed = targetTasks.every((t) => t.done);
    newDays[dayIndex] = targetDay;

    // Recalculate overall progress percentage
    let totalTasks = 0;
    let completedTasks = 0;
    newDays.forEach((d) => {
      d.tasks.forEach((t) => {
        totalTasks++;
        if (t.done) completedTasks++;
      });
    });

    const newProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    setPlan({
      ...plan,
      days: newDays,
      progressPercentage: newProgress
    });
  };

  const handleSavePlan = () => {
    setSaved(true);
    success('Study plan saved to your active schedule!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CalendarDays size={28} color="#06B6D4" />
          <span>AI Study Plan Generator</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
          Turn your curriculum into a personalized, manageable daily study roadmap with concrete objectives and practice checkpoints.
        </p>
      </div>

      {/* Input Form Card */}
      <Card>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px'
            }}
          >
            <Input
              label="Subject / Exam"
              placeholder="e.g. Data Structures, Biochemistry"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <Input
              label="Learning Goal"
              placeholder="e.g. Final Exams, Job Interview, Certification"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
              Topics to Cover (comma-separated)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Dynamic Programming"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1.5px solid #CBD5E1',
                fontSize: '0.925rem'
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '18px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
                Study Duration
              </label>
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                style={{
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.925rem'
                }}
              >
                <option value="3">3 Days (Sprint Revision)</option>
                <option value="7">7 Days (1 Week Comprehensive)</option>
                <option value="14">14 Days (2 Weeks Deep Mastery)</option>
                <option value="30">30 Days (1 Month Intensive)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
                Daily Study Hours
              </label>
              <select
                value={dailyHours}
                onChange={(e) => setDailyHours(e.target.value)}
                style={{
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.925rem'
                }}
              >
                <option value="1">1 Hour / Day (Light)</option>
                <option value="2">2 Hours / Day (Balanced)</option>
                <option value="4">4 Hours / Day (Intensive)</option>
                <option value="6">6 Hours / Day (Full-Time)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="primary" size="lg" loading={loading} icon={Sparkles}>
              Generate Study Plan
            </Button>
          </div>
        </form>
      </Card>

      {/* Loading state */}
      {loading && (
        <Card>
          <LoadingSpinner text={`Structuring ${days}-day milestone roadmap with Gemini AI...`} />
        </Card>
      )}

      {/* Generated Study Plan Display */}
      {plan && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Plan Header Info */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              padding: '18px 24px',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: 'var(--shadow-sm)',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B' }}>
                  Personalized Study Plan · {plan.durationDays} Days
                </h2>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    backgroundColor: '#E0F2FE',
                    color: '#0369A1',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  {plan.dailyHours}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>
                Goal: {plan.goal} · Subject: {plan.subject}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Button variant="outline" size="sm" onClick={() => handleGenerate()} icon={RotateCw}>
                Regenerate
              </Button>
              <Button
                variant={saved ? 'secondary' : 'primary'}
                size="sm"
                onClick={handleSavePlan}
                icon={saved ? CheckCircle2 : Bookmark}
              >
                {saved ? 'Plan Saved' : 'Save Plan'}
              </Button>
            </div>
          </div>

          {/* Overall Roadmap Progress Bar */}
          <Card style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
                Overall Completion Progress
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#06B6D4' }}>
                {plan.progressPercentage}% Completed
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${plan.progressPercentage}%`,
                  height: '100%',
                  backgroundColor: '#06B6D4',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </Card>

          {/* Vertical Day Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {plan.days.map((day, dIdx) => (
              <div
                key={day.dayNumber}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: day.completed ? '1.5px solid #A7F3D0' : '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 15px rgba(11, 15, 59, 0.04)',
                  padding: '24px',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Day Card Header */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #F1F5F9',
                    paddingBottom: '14px',
                    marginBottom: '16px',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: day.completed ? '#DCFCE7' : '#EEF2FF',
                        color: day.completed ? '#15803D' : '#4F46E5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                      }}
                    >
                      <Calendar size={18} />
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B' }}>
                        {day.title}
                      </h3>
                      <p style={{ fontSize: '0.825rem', color: '#64748B' }}>
                        Est. Time: {day.estimatedTime}
                      </p>
                    </div>
                  </div>

                  {day.completed && (
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <CheckCircle2 size={14} />
                      Completed
                    </span>
                  )}
                </div>

                {/* Objective */}
                <div style={{ marginBottom: '16px', backgroundColor: '#F8FAFC', padding: '12px 16px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Learning Objective:
                  </span>
                  <p style={{ fontSize: '0.9rem', color: '#334155', marginTop: '2px', fontWeight: 500 }}>
                    {day.objective}
                  </p>
                </div>

                {/* Tasks with interactive completion checkboxes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Daily Tasks:
                  </span>

                  {day.tasks.map((task, tIdx) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(dIdx, tIdx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: task.done ? '#F0FDF4' : '#FFFFFF',
                        border: task.done ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => {}} // handled by parent div
                        style={{ width: '16px', height: '16px', accentColor: '#10B981', cursor: 'pointer' }}
                      />
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: task.done ? '#64748B' : '#1E293B',
                          textDecoration: task.done ? 'line-through' : 'none',
                          flex: 1
                        }}
                      >
                        {task.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanPage;
