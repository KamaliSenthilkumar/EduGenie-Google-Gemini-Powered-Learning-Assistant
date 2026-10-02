import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { getMockQuiz } from '../../services/mockData';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';

const QuizActivePage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { warning } = useToast();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionIndex]: optionIndex }
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 mins default
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    // Load quiz from sessionStorage or generate fallback
    const saved = sessionStorage.getItem(`edugenie_quiz_${quizId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setQuiz(parsed);
      setSecondsRemaining(Math.round(parsed.timeLimitMinutes * 60));
    } else {
      const fallback = getMockQuiz('Computer Science', 'Fundamentals', 'Medium', 5);
      setQuiz(fallback);
      setSecondsRemaining(Math.round(fallback.timeLimitMinutes * 60));
    }
  }, [quizId]);

  // Countdown timer
  useEffect(() => {
    if (!quiz || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quiz, secondsRemaining]);

  if (!quiz) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Quiz...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectOption = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Store attempt in sessionStorage for the result page
    const attemptData = {
      quiz,
      userAnswers,
      completedAt: new Date().toISOString(),
      timeSpentSeconds: quiz.timeLimitMinutes * 60 - secondsRemaining
    };
    sessionStorage.setItem(`edugenie_quiz_result_${quiz.quizId}`, JSON.stringify(attemptData));
    navigate(`/quiz/${quiz.quizId}/result`);
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const isTimeCritical = secondsRemaining < 60;

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Quiz Top Navigation Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          padding: '16px 24px',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-sm)',
          gap: '12px'
        }}
      >
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to leave? Your quiz progress will be lost.')) {
              navigate('/quiz');
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          <ArrowLeft size={18} />
          <span>Exit Quiz</span>
        </button>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B' }}>
            {quiz.topic}
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
            {quiz.subject} · {quiz.difficulty} Difficulty
          </span>
        </div>

        {/* Timer Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '20px',
            backgroundColor: isTimeCritical ? '#FEE2E2' : '#EEF2FF',
            color: isTimeCritical ? '#B91C1C' : '#4F46E5',
            fontWeight: 700,
            fontSize: '0.9rem',
            animation: isTimeCritical ? 'pulseGlow 1s infinite' : 'none'
          }}
        >
          <Clock size={16} />
          <span>{formatTimer(secondsRemaining)}</span>
        </div>
      </div>

      {/* Progress & Question Counter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E293B' }}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
            Answered {answeredCount} of {totalQuestions}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              height: '100%',
              backgroundColor: '#4F46E5',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* Active Question Card */}
      <Card style={{ padding: '36px 32px' }}>
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#1E293B',
            lineHeight: 1.5,
            marginBottom: '28px'
          }}
        >
          {currentQuestion.question}
        </h3>

        {/* 4 Multiple Choice Options (A, B, C, D) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {currentQuestion.options.map((optionText, optIdx) => {
            const isSelected = userAnswers[currentQuestionIndex] === optIdx;
            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: isSelected ? '2px solid #4F46E5' : '1.5px solid #E2E8F0',
                  backgroundColor: isSelected ? '#EEF2FF' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#4F46E5' : '#F1F5F9',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  {optionLetters[optIdx]}
                </div>
                <span
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? '#1E293B' : '#334155',
                    lineHeight: 1.45
                  }}
                >
                  {optionText}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Navigation & Submit Action Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outline"
          size="md"
          disabled={currentQuestionIndex === 0}
          onClick={handlePrev}
          icon={ChevronLeft}
        >
          Previous
        </Button>

        <div style={{ display: 'flex', gap: '12px' }}>
          {!isLastQuestion ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              icon={ChevronRight}
              iconPosition="right"
            >
              Next Question
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowSubmitModal(true)}
              style={{ backgroundColor: '#10B981' }}
              icon={CheckCircle}
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </div>

      {/* Confirm Submission Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Quiz Attempt?"
        subtitle="Review before finalizing your score"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '0.925rem', color: '#334155', lineHeight: 1.5 }}>
            You have answered <strong>{answeredCount} of {totalQuestions}</strong> questions.
            {answeredCount < totalQuestions && (
              <span style={{ color: '#EF4444', display: 'block', marginTop: '6px' }}>
                ⚠️ You have {totalQuestions - answeredCount} unanswered question(s). Unanswered questions will count as incorrect.
              </span>
            )}
          </p>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
              Keep Reviewing
            </Button>
            <Button variant="primary" onClick={handleSubmitQuiz}>
              Confirm & Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuizActivePage;
