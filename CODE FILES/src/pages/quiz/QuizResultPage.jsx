import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  RotateCw,
  Home,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { getMockQuiz } from '../../services/mockData';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const QuizResultPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [hasSavedHistory, setHasSavedHistory] = useState(false);

  useEffect(() => {
    // Retrieve attempt from sessionStorage
    const saved = sessionStorage.getItem(`edugenie_quiz_result_${quizId}`);
    if (saved) {
      setAttempt(JSON.parse(saved));
    } else {
      // Fallback preview
      const fallbackQuiz = getMockQuiz('Computer Science', 'Fundamentals', 'Medium', 5);
      setAttempt({
        quiz: fallbackQuiz,
        userAnswers: { 0: 2, 1: 1, 2: 2, 3: 0, 4: 1 },
        completedAt: new Date().toISOString(),
        timeSpentSeconds: 180
      });
    }
  }, [quizId]);

  useEffect(() => {
    if (!attempt || hasSavedHistory) return;

    const quiz = attempt.quiz;
    const userAnswers = attempt.userAnswers || {};

    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const total = quiz.questions.length;
    const scorePct = Math.round((correctCount / total) * 100);

    // Save attempt to learning history
    api.learning.saveActivity({
      type: 'Quiz',
      title: `Completed ${quiz.topic} Quiz`,
      topic: quiz.subject,
      score: `${scorePct}%`,
      status: 'Completed'
    });
    setHasSavedHistory(true);

    // Launch celebratory confetti if passing grade
    if (scorePct >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if confetti unavailable
      }
    }
  }, [attempt, hasSavedHistory]);

  if (!attempt) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Calculating results...</div>;
  }

  const { quiz, userAnswers = {} } = attempt;
  const total = quiz.questions.length;

  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctAnswer) {
      correctCount += 1;
    }
  });

  const wrongCount = total - correctCount;
  const scorePct = Math.round((correctCount / total) * 100);

  const getPerformanceMessage = () => {
    if (scorePct >= 90) return { title: 'Mastery Achieved! 🌟', subtitle: 'Outstanding work! You have an exceptionally strong command of this topic.' };
    if (scorePct >= 75) return { title: 'Great Job! 🎯', subtitle: 'Solid comprehension! Review a few subtle concepts to reach full perfection.' };
    if (scorePct >= 50) return { title: 'Good Effort! 📚', subtitle: 'You passed the basics. Review the missed questions below to cement your recall.' };
    return { title: 'Keep Practicing! 💪', subtitle: 'Do not be discouraged. Use our AI Tutor and Smart Notes to master these concepts.' };
  };

  const perf = getPerformanceMessage();

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Result Hero Score Card */}
      <Card
        style={{
          textAlign: 'center',
          padding: '48px 32px',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
          border: '1.5px solid #E2E8F0'
        }}
      >
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            background: scorePct >= 70 ? 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' : 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 10px 25px rgba(245, 158, 11, 0.35)'
          }}
        >
          <Trophy size={44} />
        </div>

        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>
          {scorePct}%
        </h1>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#4F46E5', marginBottom: '8px' }}>
          {perf.title}
        </h2>

        <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '500px', margin: '0 auto 32px auto' }}>
          {perf.subtitle}
        </p>

        {/* 4 Performance Metric Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            maxWidth: '680px',
            margin: '0 auto 36px auto'
          }}
        >
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#DCFCE7', border: '1px solid #BBF7D0' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803D' }}>{correctCount}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#166534', marginTop: '2px' }}>Correct</div>
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#FEE2E2', border: '1px solid #FECACA' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B91C1C' }}>{wrongCount}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#991B1B', marginTop: '2px' }}>Wrong</div>
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#EEF2FF', border: '1px solid #E0E7FF' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4F46E5' }}>{total}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4338CA', marginTop: '2px' }}>Total Questions</div>
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B45309' }}>{scorePct}%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#92400E', marginTop: '2px' }}>Accuracy</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowSolutions(!showSolutions)}
            icon={showSolutions ? ChevronUp : ChevronDown}
            iconPosition="right"
          >
            {showSolutions ? 'Hide Solutions' : 'View Question-by-Question Solutions'}
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/quiz')}
            icon={RotateCw}
          >
            Retake Quiz
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/dashboard')}
            icon={Home}
          >
            Back to Dashboard
          </Button>
        </div>
      </Card>

      {/* Question-by-Question Review Breakdown */}
      {showSolutions && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B' }}>
              Detailed Question Analysis
            </h3>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              All {total} questions
            </span>
          </div>

          {quiz.questions.map((q, idx) => {
            const userAnswer = userAnswers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            const letters = ['A', 'B', 'C', 'D'];

            return (
              <Card
                key={idx}
                style={{
                  borderLeft: `5px solid ${isCorrect ? '#22C55E' : '#EF4444'}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 700, color: '#64748B', fontSize: '0.9rem' }}>
                      Q{idx + 1}.
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B' }}>
                      {q.question}
                    </h4>
                  </div>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: isCorrect ? '#DCFCE7' : '#FEE2E2',
                      color: isCorrect ? '#15803D' : '#B91C1C',
                      flexShrink: 0
                    }}
                  >
                    {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                {/* Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  {q.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctAnswer;
                    const isUserPick = optIdx === userAnswer;

                    let bg = '#FFFFFF';
                    let border = '#E2E8F0';
                    let textColor = '#334155';

                    if (isOptionCorrect) {
                      bg = '#F0FDF4';
                      border = '#22C55E';
                      textColor = '#166534';
                    } else if (isUserPick && !isCorrect) {
                      bg = '#FEF2F2';
                      border = '#EF4444';
                      textColor = '#991B1B';
                    }

                    return (
                      <div
                        key={optIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `1.5px solid ${border}`,
                          backgroundColor: bg,
                          fontSize: '0.875rem',
                          color: textColor
                        }}
                      >
                        <span style={{ fontWeight: 700 }}>{letters[optIdx]}.</span>
                        <span style={{ flex: 1 }}>{opt}</span>
                        {isOptionCorrect && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>✓ Correct Answer</span>}
                        {isUserPick && !isCorrect && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991B1B' }}>✗ Your Choice</span>}
                      </div>
                    );
                  })}
                </div>

                {/* AI Explanation Callout */}
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.85rem',
                    color: '#475569',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start'
                  }}
                >
                  <Sparkles size={16} color="#4F46E5" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#1E293B' }}>Gemini Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizResultPage;
