import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  AlertCircle,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  ArrowRight,
  RotateCw
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EvaluateAnswerPage = () => {
  const [question, setQuestion] = useState('How does database indexing work, and what are the trade-offs between B-Trees and Hash Indexes?');
  const [answer, setAnswer] = useState(
    'Database indexes speed up data retrieval by creating an auxiliary data structure referencing row locations. A B-Tree index keeps data sorted and supports efficient range queries and inequality lookups with O(log n) time. Hash indexes use a hash table for ultra-fast O(1) exact-match lookups, but cannot support range scans or prefix searching.'
  );
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const { success, error: toastError } = useToast();

  const handleEvaluate = async (e) => {
    if (e) e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      toastError('Please provide both the question and your answer.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.ai.evaluateAnswer({ question, answer });
      setEvaluation(data);
      success('AI Answer evaluation completed!');

      api.learning.saveActivity({
        type: 'Evaluation',
        title: `Evaluated: ${question.slice(0, 32)}...`,
        topic: 'Exam Answer Evaluation',
        score: `${data.score}/100`,
        status: 'Reviewed'
      });
    } catch (err) {
      toastError('Failed to evaluate answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={28} color="#EC4899" />
          <span>Evaluate Answer</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
          Submit your subjective, essay, or exam answer to receive detailed constructive feedback and grading from Gemini AI.
        </p>
      </div>

      {/* Input Form Card */}
      <Card>
        <form onSubmit={handleEvaluate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
              Question or Prompt <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Paste or write the assignment question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1.5px solid #CBD5E1',
                fontSize: '0.925rem',
                lineHeight: 1.5
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
                Your Answer <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                {answer.length} characters
              </span>
            </div>
            <textarea
              rows={6}
              placeholder="Write your detailed explanation or solution here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: '1.5px solid #CBD5E1',
                fontSize: '0.925rem',
                lineHeight: 1.6
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button type="submit" variant="primary" size="lg" loading={loading} icon={Sparkles}>
              Evaluate Answer
            </Button>
          </div>
        </form>
      </Card>

      {/* Loading state */}
      {loading && (
        <Card>
          <LoadingSpinner text="Analyzing your answer against academic rubrics with Gemini AI..." />
        </Card>
      )}

      {/* AI Evaluation Report Card */}
      {evaluation && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Score Header Card */}
          <Card
            style={{
              padding: '28px',
              backgroundColor: '#FFFFFF',
              borderLeft: `6px solid ${evaluation.score >= 80 ? '#22C55E' : '#F59E0B'}`
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Evaluation Score
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1E293B' }}>
                    {evaluation.score}
                  </span>
                  <span style={{ fontSize: '1.2rem', color: '#94A3B8', fontWeight: 600 }}>/ 100</span>
                </div>
              </div>

              <div
                style={{
                  padding: '8px 16px',
                  borderRadius: '24px',
                  backgroundColor: evaluation.score >= 80 ? '#DCFCE7' : '#FEF3C7',
                  color: evaluation.score >= 80 ? '#15803D' : '#B45309',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle2 size={18} />
                <span>{evaluation.correctness}</span>
              </div>
            </div>

            {/* Score Progress Bar */}
            <div style={{ width: '100%', height: '10px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', marginTop: '20px' }}>
              <div
                style={{
                  width: `${evaluation.score}%`,
                  height: '100%',
                  backgroundColor: evaluation.score >= 80 ? '#22C55E' : '#F59E0B',
                  borderRadius: '6px',
                  transition: 'width 0.8s ease'
                }}
              />
            </div>
          </Card>

          {/* Grid: Strengths & Missing Points */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* What you did well */}
            <Card
              title="What You Did Well"
              subtitle="Key strengths identified in your response"
              style={{ borderTop: '4px solid #22C55E' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {evaluation.strengths.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <ThumbsUp size={12} />
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Missing Points / Gaps */}
            <Card
              title="Missing Points & Gaps"
              subtitle="Opportunities to add precision and depth"
              style={{ borderTop: '4px solid #F59E0B' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {evaluation.missingPoints.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <AlertTriangle size={12} />
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Model Explanation */}
          <Card title="Ideal Explanation" subtitle="How a top-tier academic answer could be structured">
            <div style={{ backgroundColor: '#F8FAFC', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #4F46E5', fontSize: '0.95rem', color: '#334155', lineHeight: 1.65 }}>
              {evaluation.correctExplanation}
            </div>
          </Card>

          {/* Suggestions for Improvement */}
          <Card title="Actionable Suggestions for Improvement" subtitle="Follow these steps when writing your next response">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {evaluation.improvementSuggestions.map((sug, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lightbulb size={18} color="#4F46E5" />
                  <span style={{ fontSize: '0.9rem', color: '#334155' }}>{sug}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EvaluateAnswerPage;
