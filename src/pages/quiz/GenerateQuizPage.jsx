import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Sparkles, HelpCircle, Clock, Zap, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const GenerateQuizPage = () => {
  const [subject, setSubject] = useState('Computer Science');
  const [topic, setTopic] = useState('Data Structures & Algorithms');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { error: toastError } = useToast();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      toastError('Please enter a topic for the quiz');
      return;
    }

    setLoading(true);
    try {
      const quiz = await api.ai.generateQuiz({
        subject,
        topic,
        difficulty,
        count: parseInt(questionCount, 10)
      });

      // Save the quiz to session storage for the active quiz screen
      sessionStorage.setItem(`edugenie_quiz_${quiz.quizId}`, JSON.stringify(quiz));
      navigate(`/quiz/${quiz.quizId}`);
    } catch (err) {
      toastError('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BrainCircuit size={28} color="#F59E0B" />
          <span>Generate AI Quiz</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
          Configure a targeted, multiple-choice quiz tailored to your knowledge level and subject matter.
        </p>
      </div>

      {loading ? (
        <Card>
          <LoadingSpinner text={`Synthesizing ${questionCount} tailored questions on "${topic}" using Gemini...`} />
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Configuration Form Card */}
          <Card title="Quiz Parameters" subtitle="Specify the syllabus and challenge level">
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Input
                label="Subject Area"
                placeholder="e.g. Computer Science, Mathematics, History"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

              <Input
                label="Topic / Chapter"
                placeholder="e.g. Python OOP, Binary Trees, Cold War"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
                  Difficulty Level
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {['Easy', 'Medium', 'Hard'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDifficulty(lvl)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: difficulty === lvl ? '2px solid #F59E0B' : '1.5px solid #E2E8F0',
                        backgroundColor: difficulty === lvl ? '#FEF3C7' : '#FFFFFF',
                        color: difficulty === lvl ? '#B45309' : '#475569',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
                  Number of Questions
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[5, 10, 15].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setQuestionCount(cnt)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: questionCount === cnt ? '2px solid #4F46E5' : '1.5px solid #E2E8F0',
                        backgroundColor: questionCount === cnt ? '#EEF2FF' : '#FFFFFF',
                        color: questionCount === cnt ? '#4F46E5' : '#475569',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {cnt} Questions
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth icon={Sparkles} style={{ marginTop: '8px' }}>
                Generate Quiz ({questionCount} Questions)
              </Button>
            </form>
          </Card>

          {/* Quick Info & Tips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card
              title="How AI Quizzes Work"
              style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.925rem', fontWeight: 600, color: '#92400E' }}>Dynamic Generation</h4>
                    <p style={{ fontSize: '0.825rem', color: '#B45309', marginTop: '2px' }}>
                      Questions are generated uniquely per attempt, preventing repetitive memorization.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.925rem', fontWeight: 600, color: '#92400E' }}>Timed Practice</h4>
                    <p style={{ fontSize: '0.825rem', color: '#B45309', marginTop: '2px' }}>
                      Includes an active countdown timer mimicking realistic university exam conditions.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.925rem', fontWeight: 600, color: '#92400E' }}>Solution Rationales</h4>
                    <p style={{ fontSize: '0.825rem', color: '#B45309', marginTop: '2px' }}>
                      After submission, inspect comprehensive rationales for both correct and incorrect options.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Recent Topics You've Practiced">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Binary Search Trees', 'Neural Networks', 'Python Functions', 'SQL Joins', 'Microeconomics'].map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTopic(item)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '16px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      color: '#475569',
                      fontSize: '0.825rem',
                      cursor: 'pointer'
                    }}
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateQuizPage;
