import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await register(fullName, email, password);
      if (res.success) {
        success('Account created successfully! Welcome to EduGenie.');
        navigate('/dashboard');
      } else {
        toastError(res.error || 'Failed to create account');
      }
    } catch (err) {
      toastError('Registration error occurred');
    } finally {
      setSubmitting(false);
    }
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
        {/* Left Side: Brand & Benefits */}
        <div
          style={{
            backgroundColor: '#0B0F3B',
            color: '#FFFFFF',
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
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
              <span>Join Today</span>
            </div>

            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, marginBottom: '20px' }}>
              Your personal AI tutor is ready to help you thrive.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '24px' }}>
              {[
                'Unlimited AI Topic Explanations',
                'Custom Study Notes in Seconds',
                'Interactive Quizzes with Explanations',
                'Personalized Day-by-Day Study Plans'
              ].map((perk, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={14} color="#FFFFFF" />
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#E2E8F0' }}>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '40px' }}>
            Free for all students · No credit card required
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
              Create Account
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#64748B' }}>
              Sign up to start your intelligent learning journey today.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Full Name"
              placeholder="e.g. Alex Morgan"
              icon={User}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="alex@stanford.edu"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 6 characters"
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

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              icon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
            />

            <Button type="submit" variant="primary" size="lg" fullWidth loading={submitting} style={{ marginTop: '8px' }}>
              Create Student Account
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: '#64748B' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#4F46E5', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
