import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Copy,
  Check,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  Bot,
  User,
  HelpCircle,
  Code2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import Button from '../../components/common/Button';

const SUGGESTION_CHIPS = [
  'Give an example',
  'Explain in simple words',
  'Make it more detailed',
  'Explain the importance'
];

const AITutorPage = () => {
  const { user } = useAuth();
  const { info, success } = useToast();

  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! 👋 I am your **EduGenie AI Tutor**.\n\nI can explain complex theories, write code examples, break down math problems, or prepare you for exams.\n\nWhat topic would you like to explore today?`,
      timestamp: 'Just now',
      liked: null
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customText) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await api.ai.tutor(textToSend.trim(), messages);
      const aiMsg = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: response.reply,
        timestamp: response.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        liked: null
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Save activity in history
      api.learning.saveActivity({
        type: 'AI Tutor',
        title: `Tutoring Session: ${textToSend.slice(0, 35)}...`,
        topic: 'AI Tutoring',
        score: null,
        status: 'Completed'
      });
    } catch (err) {
      const errorMsg = {
        id: 'err_' + Date.now(),
        sender: 'ai',
        text: 'Sorry, I encountered an issue connecting to the AI model. Please try again.',
        timestamp: 'Just now',
        isError: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id, isLike) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, liked: isLike } : m))
    );
    info(isLike ? 'Thanks for the positive feedback!' : 'Feedback noted. We will improve!');
  };

  const handleRegenerate = async (index) => {
    // Find the preceding user message
    let precedingUserText = 'Can you re-explain that?';
    for (let i = index - 1; i >= 0; i--) {
      if (messages[i].sender === 'user') {
        precedingUserText = messages[i].text;
        break;
      }
    }
    handleSend(`Please elaborate further on: "${precedingUserText}"`);
  };

  // Basic formatted message renderer
  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeContent = [];

    const elements = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div
              key={`code-${idx}`}
              style={{
                backgroundColor: '#0F172A',
                color: '#38BDF8',
                borderRadius: '10px',
                padding: '14px',
                margin: '10px 0',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap'
              }}
            >
              {codeContent.join('\n')}
            </div>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={idx} style={{ fontSize: '1.05rem', fontWeight: 700, margin: '12px 0 6px 0', color: '#1E293B' }}>
            {line.replace('### ', '')}
          </h4>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h3 key={idx} style={{ fontSize: '1.15rem', fontWeight: 700, margin: '14px 0 8px 0', color: '#1E293B' }}>
            {line.replace('## ', '')}
          </h3>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <div key={idx} style={{ display: 'flex', gap: '8px', margin: '4px 0 4px 12px' }}>
            <span style={{ color: '#4F46E5', fontWeight: 700 }}>•</span>
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.substring(2)) }} />
          </div>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={idx} style={{ height: '8px' }} />);
      } else {
        elements.push(
          <p key={idx} style={{ margin: '4px 0', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        );
      }
    });

    return elements;
  };

  const formatInline = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background-color: #EEF2FF; color: #4F46E5; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; font-family: monospace;">$1</code>');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--topbar-height) - 70px)', minHeight: '540px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '16px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
            AI Tutor <span style={{ fontSize: '0.8rem', backgroundColor: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>Gemini 1.5</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Ask anything and learn step by step.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])}>
          Clear Conversation
        </Button>
      </div>

      {/* Chat Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {messages.map((msg, index) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: isAi ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                alignSelf: isAi ? 'flex-start' : 'flex-end'
              }}
              className="chat-message-row"
            >
              {isAi && (
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0,
                    boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
                  }}
                >
                  <Bot size={20} />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
                {/* Bubble Container */}
                <div
                  style={{
                    padding: isAi ? '16px 20px' : '12px 18px',
                    borderRadius: isAi ? '4px 18px 18px 18px' : '18px 18px 4px 18px',
                    backgroundColor: isAi ? '#FFFFFF' : '#4F46E5',
                    color: isAi ? '#1E293B' : '#FFFFFF',
                    boxShadow: isAi ? '0 4px 20px -2px rgba(11, 15, 59, 0.06)' : '0 4px 14px rgba(79, 70, 229, 0.35)',
                    border: isAi ? '1px solid #E2E8F0' : 'none',
                    fontSize: '0.925rem',
                    lineHeight: 1.55,
                    wordBreak: 'break-word'
                  }}
                >
                  {isAi ? renderFormattedText(msg.text) : msg.text}
                </div>

                {/* AI Action Toolbar */}
                {isAi && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginTop: '6px',
                      paddingLeft: '4px',
                      fontSize: '0.75rem',
                      color: '#94A3B8'
                    }}
                  >
                    <span>{msg.timestamp}</span>

                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: copiedId === msg.id ? '#22C55E' : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        padding: '2px 4px'
                      }}
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => handleRegenerate(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        padding: '2px 4px'
                      }}
                      title="Regenerate explanation"
                    >
                      <RotateCw size={14} />
                      <span>Elaborate</span>
                    </button>

                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <button
                        onClick={() => handleFeedback(msg.id, true)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: msg.liked === true ? '#22C55E' : '#94A3B8',
                          cursor: 'pointer',
                          padding: '2px 4px'
                        }}
                        title="Good response"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, false)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: msg.liked === false ? '#EF4444' : '#94A3B8',
                          cursor: 'pointer',
                          padding: '2px 4px'
                        }}
                        title="Needs improvement"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', alignSelf: 'flex-start' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Bot size={20} />
            </div>
            <div
              style={{
                padding: '12px 18px',
                borderRadius: '4px 18px 18px 18px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>AI Tutor is formulating an answer</span>
              <div style={{ display: 'flex', gap: '4px', marginLeft: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', animation: 'pulseGlow 1s infinite 0s' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', animation: 'pulseGlow 1s infinite 0.2s' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', animation: 'pulseGlow 1s infinite 0.4s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '10px 0 14px 0' }}>
        {SUGGESTION_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            disabled={loading}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#475569',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.backgroundColor = '#EEF2FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.color = '#475569';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Bottom Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#FFFFFF',
          padding: '8px 12px 8px 18px',
          borderRadius: '16px',
          border: '1.5px solid #CBD5E1',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
        }}
      >
        <input
          type="text"
          placeholder="Ask anything... e.g., 'Explain QuickSort with an analogy'"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '0.95rem',
            padding: '8px 0',
            backgroundColor: 'transparent'
          }}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!inputValue.trim() || loading}
          icon={Send}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default AITutorPage;
