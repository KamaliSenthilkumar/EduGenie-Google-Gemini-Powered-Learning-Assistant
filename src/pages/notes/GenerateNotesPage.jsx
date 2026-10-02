import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Download,
  Share2,
  Bookmark,
  RotateCw,
  Edit3,
  Check,
  BookOpen,
  CheckCircle,
  FileDown
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const GenerateNotesPage = () => {
  const [subject, setSubject] = useState('Computer Science');
  const [topic, setTopic] = useState('Binary Search Trees');
  const [instructions, setInstructions] = useState('Include definitions, invariants, and operations complexity');
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const { success, info } = useToast();

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setSaved(false);
    setIsEditing(false);
    try {
      const data = await api.ai.generateNotes({ subject, topic, instructions });
      setNotes(data);
      success('Smart revision notes generated!');

      api.learning.saveActivity({
        type: 'Notes',
        title: `Notes: ${topic}`,
        topic: subject,
        score: null,
        status: 'Saved'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!notes) return;
    const content = `
# ${notes.title}
Subject: ${notes.subject} | Date: ${notes.date}

## Overview
${notes.overview}

## Key Concepts
${notes.keyConcepts.map((k) => `- ${k}`).join('\n')}

## Important Definitions
${notes.definitions.map((d) => `* **${d.term}**: ${d.definition}`).join('\n')}

## Examples
${notes.examples.map((ex) => `### ${ex.scenario}\n${ex.detail}`).join('\n\n')}

## Importance
${notes.importance}

## Quick Revision
${notes.quickRevision.map((r) => `- ${r}`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${notes.topic.replace(/\s+/g, '_')}_Study_Notes.md`;
    link.click();
    URL.revokeObjectURL(url);
    success('Notes downloaded as Markdown file!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Study note shareable link copied to clipboard!');
  };

  const handleSave = () => {
    setSaved(true);
    success('Notes saved to your learning notebook!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileText size={28} color="#10B981" />
          <span>Generate Smart Notes</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
          Create structured, examination-ready study notes with definitions, key concepts, and quick revision points.
        </p>
      </div>

      {/* Inputs Form */}
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
              label="Subject"
              placeholder="e.g. Computer Science, Organic Chemistry"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <Input
              label="Topic"
              placeholder="e.g. Binary Search Trees, Keynesian Economics"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
              Additional Instructions (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Focus on definitions, real-world examples, or specific formulas..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1.5px solid #CBD5E1',
                fontSize: '0.925rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="primary" size="md" loading={loading} icon={Sparkles}>
              Generate Notes
            </Button>
          </div>
        </form>
      </Card>

      {/* Loading state */}
      {loading && (
        <Card>
          <LoadingSpinner text={`Drafting comprehensive notes on "${topic}" with Gemini AI...`} />
        </Card>
      )}

      {/* Notes Viewer Document Container */}
      {notes && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Action Header */}
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
              gap: '12px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Subject: </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B' }}>{notes.subject}</span>
              <span style={{ margin: '0 8px', color: '#CBD5E1' }}>|</span>
              <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Created: </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1E293B' }}>{notes.date}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                icon={Edit3}
              >
                {isEditing ? 'Preview Mode' : 'Edit Notes'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleGenerate()} icon={RotateCw}>
                Regenerate
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} icon={FileDown}>
                Download .MD
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} icon={Share2}>
                Share
              </Button>
              <Button
                variant={saved ? 'secondary' : 'primary'}
                size="sm"
                onClick={handleSave}
                icon={saved ? CheckCircle : Bookmark}
              >
                {saved ? 'Saved' : 'Save Notes'}
              </Button>
            </div>
          </div>

          {/* Document Body */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '40px 36px',
              boxShadow: '0 4px 25px -4px rgba(11, 15, 59, 0.06)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px'
            }}
          >
            {/* Title */}
            <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B' }}>
                {notes.title}
              </h2>
            </div>

            {/* 1. Overview */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#10B981', marginBottom: '8px' }}>
                1. Overview
              </h3>
              {isEditing ? (
                <textarea
                  rows={4}
                  value={notes.overview}
                  onChange={(e) => setNotes({ ...notes, overview: e.target.value })}
                  style={{ width: '100%', padding: '12px' }}
                />
              ) : (
                <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.65 }}>
                  {notes.overview}
                </p>
              )}
            </div>

            {/* 2. Key Concepts */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#10B981', marginBottom: '10px' }}>
                2. Key Concepts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notes.keyConcepts.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', marginTop: '9px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Important Definitions */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#10B981', marginBottom: '12px' }}>
                3. Important Definitions
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                {notes.definitions.map((def, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      backgroundColor: '#F8FAFC',
                      borderLeft: '4px solid #10B981',
                      border: '1px solid #E2E8F0',
                      borderLeftWidth: '4px'
                    }}
                  >
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                      {def.term}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>
                      {def.definition}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Examples */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#10B981', marginBottom: '8px' }}>
                4. Examples
              </h3>
              {notes.examples.map((ex, idx) => (
                <div key={idx} style={{ padding: '16px', backgroundColor: '#F0FDF4', borderRadius: '12px', border: '1px solid #DCFCE7' }}>
                  <div style={{ fontWeight: 600, color: '#166534', marginBottom: '4px' }}>{ex.scenario}</div>
                  <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>{ex.detail}</div>
                </div>
              ))}
            </div>

            {/* 5. Importance */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#10B981', marginBottom: '8px' }}>
                5. Importance & Real-World Application
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6 }}>
                {notes.importance}
              </p>
            </div>

            {/* 6. Quick Revision */}
            <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1.5px dashed #CBD5E1' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '10px' }}>
                ⚡ Quick Revision Checklist
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notes.quickRevision.map((rev, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={16} color="#10B981" />
                    <span style={{ fontSize: '0.9rem', color: '#475569' }}>{rev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateNotesPage;
