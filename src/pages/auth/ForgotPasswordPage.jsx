import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { success } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide your registered email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      success('Password reset link sent to your inbox!');
    }, 800);
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
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -10px rgba(11, 15, 59, 0.1)',
          padding: '40px 36px',
          border: '1px solid #E2E8F0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <GraduationCap size={22} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', fontFamily: 'Poppins, sans-serif' }}>
            Edu<span style={{ color: '#4F46E5' }}>Genie</span>
          </span>
        </div>

        {!submitted ? (
          <>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
              Forgot Password?
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
              Don't worry! Enter your email address below and we'll send you a link to reset your account password.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <Input
                label="Registered Email"
                type="email"
                placeholder="alex.morgan@stanford.edu"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                required
              />

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
              Reset Link Sent!
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
              We've dispatched password recovery instructions to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/reset-password')}
              style={{ marginBottom: '12px' }}
            >
              Simulate Clicking Reset Link
            </Button>
          </div>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link
            to="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.875rem',
              color: '#4F46E5',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
