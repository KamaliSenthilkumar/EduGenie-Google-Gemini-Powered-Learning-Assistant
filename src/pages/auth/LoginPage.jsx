import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, GraduationCap, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const LoginPage = () => {
  const [email, setEmail] = useState('alex.morgan@stanford.edu');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        success('Welcome back to EduGenie!');
        navigate('/dashboard');
      } else {
        toastError(res.error || 'Failed to sign in');
      }
    } catch (err) {
      toastError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('alex.morgan@stanford.edu');
    setPassword('Password123!');
    setSubmitting(true);
    await login('alex.morgan@stanford.edu', 'Password123!');
    success('Signed in as Demo Student!');
    navigate('/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#F5F6FB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -10px rgba(11, 15, 59, 0.1)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          overflow: 'hidden',
          border: '1px solid #E2E8F0'
        }}
      >
        {/* Left Side: Brand & Visual */}
        <div
          style={{
            backgroundColor: '#0B0F3B',
            color: '#FFFFFF',
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background glow circle */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, rgba(11, 15, 59, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div>
            <div
              onClick={() => navigate('/')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '36px' }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <GraduationCap size={24} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
                Edu<span style={{ color: '#818CF8' }}>Genie</span>
              </span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '20px',
                backgroundColor: 'rgba(79, 70, 229, 0.25)',
                color: '#818CF8',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '16px'
              }}
            >
              <Sparkles size={14} />
              <span>AI Learning Platform</span>
            </div>

            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, marginBottom: '16px' }}>
              Master any topic with step-by-step AI guidance.
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.6 }}>
              Log in to access your customized notes, practice quizzes, smart answers evaluation, and learning streak.
            </p>
          </div>

          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginTop: '40px'
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>💡 Pro Study Tip</div>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px' }}>
              Taking a 5-question AI quiz immediately after generating notes improves retention by over 40%!
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
              Welcome Back!
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#64748B' }}>
              Enter your credentials to continue your learning journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <Input
              label="Email Address"
              type="email"
              placeholder="student@university.edu"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <Link to="/forgot-password" style={{ fontSize: '0.825rem', color: '#4F46E5', fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={submitting}>
              Login to EduGenie
            </Button>

            {/* Quick Demo Access */}
            <div style={{ textAlign: 'center', margin: '6px 0' }}>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>— OR —</span>
            </div>

            <Button type="button" variant="secondary" size="md" fullWidth onClick={handleDemoLogin}>
              Instant Guest / Demo Login
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '28px', fontSize: '0.875rem', color: '#64748B' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#4F46E5', fontWeight: 600 }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
