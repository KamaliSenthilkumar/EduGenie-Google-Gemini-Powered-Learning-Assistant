import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  Copy,
  Check,
  RotateCw,
  Bookmark,
  Trash2,
  BookOpen,
  Code2,
  CheckCircle,
  FileCheck,
  GraduationCap
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ExplainTopicPage = () => {
  const [subject, setSubject] = useState('Computer Science');
  const [topic, setTopic] = useState('Recursion and Call Stack');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const { success, info } = useToast();

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setSaved(false);
    try {
      const data = await api.ai.explain({ subject, topic, difficulty });
      setExplanation(data);
      success('Topic explained successfully!');

      // Save activity
      api.learning.saveActivity({
        type: 'Explanation',
        title: `Understood: ${topic}`,
        topic: subject,
        score: null,
        status: 'Completed'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!explanation) return;
    const textToCopy = `
Topic: ${explanation.topic} (${explanation.difficulty})
Subject: ${explanation.subject}

Simple Explanation:
${explanation.simpleExplanation}

Key Concepts:
${explanation.keyConcepts.map((k) => `• ${k.title}: ${k.description}`).join('\n')}

Example (${explanation.example?.title}):
${explanation.example?.code || ''}
${explanation.example?.explanation || ''}

Important Points:
${explanation.importantPoints.map((p) => `• ${p}`).join('\n')}

Quick Summary:
${explanation.quickSummary}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    success('Full explanation copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    success('Explanation saved to your study records!');
  };

  const handleClear = () => {
    setExplanation(null);
    setSaved(false);
    info('Content cleared');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lightbulb size={28} color="#0EA5E9" />
          <span>Explain a Topic</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
          Understand difficult concepts with simple analogies, structural breakdowns, and real-world code.
        </p>
      </div>

      {/* Input Form Card */}
      <Card>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px'
            }}
          >
            <Input
              label="Subject"
              placeholder="e.g. Computer Science, Physics, Biology"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <Input
              label="Topic or Concept"
              placeholder="e.g. Recursion, Photosynthesis, Bayes Theorem"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.925rem'
                }}
              >
                <option value="Beginner">Beginner (Intuitive & Analogies)</option>
                <option value="Intermediate">Intermediate (Standard Academic Rigor)</option>
                <option value="Advanced">Advanced (Deep Technical & Mathematical)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            {explanation && (
              <Button variant="outline" type="button" onClick={handleClear} icon={Trash2}>
                Clear
              </Button>
            )}
            <Button type="submit" variant="primary" size="md" loading={loading} icon={Sparkles}>
              Explain Topic
            </Button>
          </div>
        </form>
      </Card>

      {/* Loading state */}
      {loading && (
        <Card>
          <LoadingSpinner text={`Synthesizing structured explanation for "${topic}" using Gemini...`} />
        </Card>
      )}

      {/* Explanation Results Viewer */}
      {explanation && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Action Toolbar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              padding: '14px 20px',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: 'var(--shadow-sm)',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B' }}>
                {explanation.topic}
              </span>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  backgroundColor: '#E0F2FE',
                  color: '#0369A1',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                {explanation.difficulty}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
                in {explanation.subject}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button variant="outline" size="sm" onClick={handleCopy} icon={copied ? Check : Copy}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleGenerate()} icon={RotateCw}>
                Regenerate
              </Button>
              <Button
                variant={saved ? 'secondary' : 'outline'}
                size="sm"
                onClick={handleSave}
                icon={saved ? CheckCircle : Bookmark}
              >
                {saved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>

          {/* Section 1: Simple Explanation */}
          <Card title="1. Simple Explanation" subtitle="Intuitive mental model of how this works">
            <p style={{ fontSize: '1.025rem', color: '#334155', lineHeight: 1.7, backgroundColor: '#F8FAFC', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #0EA5E9' }}>
              {explanation.simpleExplanation}
            </p>
          </Card>

          {/* Section 2: Key Concepts */}
          <Card title="2. Key Concepts" subtitle="The core architectural components you must know">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {explanation.keyConcepts.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                      {idx + 1}
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1E293B' }}>{item.title}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 3: Concrete Example */}
          {explanation.example && (
            <Card title="3. Concrete Example" subtitle={explanation.example.title}>
              {explanation.example.code && (
                <pre
                  style={{
                    backgroundColor: '#0F172A',
                    color: '#38BDF8',
                    padding: '18px',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    overflowX: 'auto',
                    marginBottom: '14px'
                  }}
                >
                  <code>{explanation.example.code}</code>
                </pre>
              )}
              <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.6 }}>
                {explanation.example.explanation}
              </p>
            </Card>
          )}

          {/* Section 4: Important Points */}
          <Card title="4. Important Points & Pitfalls" subtitle="Critical details for exams and real-world usage">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {explanation.importantPoints.map((pt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.925rem', color: '#334155', lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 5: Quick Summary */}
          <Card title="5. Quick Summary" style={{ backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }}>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: '#0369A1', lineHeight: 1.6 }}>
              {explanation.quickSummary}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExplainTopicPage;
