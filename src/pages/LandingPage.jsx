import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Lightbulb,
  FileText,
  BrainCircuit,
  CheckCircle2,
  CalendarDays,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  GraduationCap,
  Play,
  Layers,
  ChevronRight
} from 'lucide-react';
import Button from '../components/common/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Tutor',
      desc: 'Ask questions and learn with your 24/7 personal conversational tutor powered by Gemini.',
      gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      path: '/ai-tutor'
    },
    {
      icon: Lightbulb,
      title: 'Topic Explanation',
      desc: 'Understand difficult concepts with simple analogies, core concepts, and concrete examples.',
      gradient: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
      path: '/explain'
    },
    {
      icon: FileText,
      title: 'Smart Notes',
      desc: 'Generate comprehensive, structured revision notes with definitions and key takeaways instantly.',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      path: '/notes'
    },
    {
      icon: BrainCircuit,
      title: 'AI Quiz Generator',
      desc: 'Practice with tailored quizzes with customizable difficulty and question counts.',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
      path: '/quiz'
    },
    {
      icon: CheckCircle2,
      title: 'Answer Evaluation',
      desc: 'Get instant, constructive AI grading on your long-form answers with improvement suggestions.',
      gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
      path: '/evaluate'
    },
    {
      icon: CalendarDays,
      title: 'Personalized Study Plans',
      desc: 'Create day-by-day learning roadmaps customized to your target duration and study goals.',
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)',
      path: '/study-plan'
    }
  ];

  const steps = [
    { number: '01', title: 'Ask', desc: 'Type your topic, concept or question into EduGenie in natural language.' },
    { number: '02', title: 'Learn', desc: 'Receive crystal-clear explanations, structured notes, and step-by-step breakdowns.' },
    { number: '03', title: 'Practice', desc: 'Test your retention with AI-generated quizzes and write descriptive answers.' },
    { number: '04', title: 'Improve', desc: 'Get intelligent answer evaluation, track your streak, and watch mastery soar.' }
  ];

  const highlights = [
    {
      icon: Target,
      title: 'Personalized Learning',
      desc: 'Every student learns at their own pace. EduGenie adapts difficulty from Beginner to Advanced.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Assistance',
      desc: 'Harness the deep reasoning of Google Gemini to unpack complex academic subjects in seconds.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      desc: 'Visual score trends, study streaks, and categorized performance insights keeping you accountable.'
    },
    {
      icon: Layers,
      title: 'Interactive Practice',
      desc: 'Move beyond passive reading with timed quizzes, instant scoring, and AI evaluation feedback.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Top Navbar */}
      <nav
        style={{
          height: '72px',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)'
            }}
          >
            <GraduationCap size={24} />
          </div>
          <span style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1E293B', fontFamily: 'Poppins, sans-serif' }}>
            Edu<span style={{ color: '#4F46E5' }}>Genie</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Log In
          </Button>
          <Button variant="primary" onClick={() => navigate('/register')} icon={Sparkles}>
            Get Started Free
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          padding: '72px 24px 96px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '24px',
              backgroundColor: '#EEF2FF',
              color: '#4F46E5',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '20px'
            }}
          >
            <Sparkles size={16} />
            <span>Google Gemini Powered Learning Platform</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.6rem)',
              fontWeight: 800,
              color: '#0B0F3B',
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-1px'
            }}
          >
            Learn Smarter with <span style={{ color: '#4F46E5' }}>EduGenie</span>
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: '#64748B',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '540px'
            }}
          >
            Your AI-powered learning assistant for understanding concepts, creating notes, practicing quizzes, and improving your knowledge.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <Button size="lg" variant="primary" onClick={() => navigate('/register')} icon={ArrowRight} iconPosition="right">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Features
            </Button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://images.unsplash.com/photo-${1530000000000 + i * 50000}?auto=format&fit=crop&q=80&w=64`}
                  alt="Student"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                    marginLeft: i === 1 ? '0' : '-8px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=64';
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>
              Joined by <strong style={{ color: '#1E293B' }}>10,000+ students</strong> worldwide
            </span>
          </div>
        </div>

        {/* Hero Visual / Interactive Preview Card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#0B0F3B',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 25px 60px -15px rgba(11, 15, 59, 0.35)',
              color: '#FFFFFF'
            }}
          >
            {/* Window header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #1E295A' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#818CF8', fontWeight: 600 }}>EduGenie Workspace</span>
            </div>

            {/* Chat Mock Snippet */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#4F46E5',
                  color: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: '16px 16px 2px 16px',
                  fontSize: '0.875rem',
                  maxWidth: '85%'
                }}
              >
                Explain how Transformers use self-attention mechanism!
              </div>

              <div
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  padding: '14px 16px',
                  borderRadius: '16px 16px 16px 2px',
                  fontSize: '0.85rem',
                  color: '#E2E8F0',
                  lineHeight: 1.5,
                  maxWidth: '95%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#818CF8', fontWeight: 600, marginBottom: '6px' }}>
                  <Sparkles size={14} />
                  <span>EduGenie AI Tutor</span>
                </div>
                Self-attention calculates attention weights for each word with respect to all other words using Query, Key, and Value vectors:
                <div style={{ margin: '8px 0', padding: '6px 10px', backgroundColor: '#070A28', borderRadius: '8px', fontFamily: 'monospace', color: '#38BDF8', fontSize: '0.8rem' }}>
                  Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V
                </div>
                This enables models to capture contextual dependencies regardless of distance.
              </div>
            </div>

            {/* Floating stats tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '14px',
                backgroundColor: 'rgba(79, 70, 229, 0.25)',
                border: '1px solid rgba(129, 140, 248, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={18} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Quiz Evaluated</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Score: 95% · Accuracy: High</div>
                </div>
              </div>
              <Button size="sm" variant="primary" onClick={() => navigate('/dashboard')}>
                Try Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '80px 24px', backgroundColor: '#F5F6FB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Engineered for Students
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0B0F3B', marginTop: '8px' }}>
              Everything You Need to Excel Academically
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B', maxWidth: '600px', margin: '12px auto 0 auto' }}>
              Six specialized AI learning tools engineered to boost comprehension, reinforce memory, and accelerate mastery.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(feat.path)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '28px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 20px -2px rgba(11, 15, 59, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(79, 70, 229, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(11, 15, 59, 0.05)';
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: feat.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      marginBottom: '20px',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
                    {feat.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4F46E5', fontSize: '0.875rem', fontWeight: 600 }}>
                    <span>Launch Tool</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '1px' }}>
              The 4-Step Cycle
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0B0F3B', marginTop: '8px' }}>
              How EduGenie Accelerates Learning
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              position: 'relative'
            }}
          >
            {steps.map((st, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '20px',
                  padding: '30px 24px',
                  border: '1px solid #E2E8F0',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#CBD5E1', lineHeight: 1, marginBottom: '16px' }}>
                  {st.number}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why EduGenie Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#0B0F3B', color: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#818CF8', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Why Choose EduGenie
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '8px' }}>
              Built From the Ground Up For Serious Students
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '28px'
            }}
          >
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '28px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(79, 70, 229, 0.25)',
                      color: '#818CF8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '18px'
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            borderRadius: '28px',
            padding: '60px 36px',
            color: '#FFFFFF',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)'
          }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
            Ready to Supercharge Your Studies?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#E0E7FF', maxWidth: '620px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
            Join thousands of university and high school students who save hours every week with personalized AI learning.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/register')}
            style={{ backgroundColor: '#FFFFFF', color: '#4F46E5', fontWeight: 700 }}
            icon={ArrowRight}
            iconPosition="right"
          >
            Create Your Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#070A28', color: '#64748B', padding: '40px 24px', borderTop: '1px solid #161D5A' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GraduationCap size={22} color="#818CF8" />
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
              EduGenie
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>— Google Gemini Powered Learning Assistant</span>
          </div>

          <div style={{ fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} EduGenie Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
