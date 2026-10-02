import React, { useState } from 'react';
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  Flame,
  Brain,
  Edit3,
  Lock,
  CheckCircle2,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { success, error: toastError } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Edit profile state
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || '');
  const [email, setEmail] = useState(user?.email || '');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toastError('Name cannot be empty');
      return;
    }
    updateProfile({ name, role, email });
    setIsEditModalOpen(false);
    success('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setPasswordError('');
    setIsPasswordModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    success('Password changed successfully!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <User size={28} color="#4F46E5" />
          <span>Student Profile</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
          Manage your account credentials, view academic statistics, and customize your learner persona.
        </p>
      </div>

      {/* Main Profile Header Card */}
      <Card>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'}
              alt={user?.name || 'Alex Morgan'}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #EEF2FF',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.2)'
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#1E293B' }}>
                  {user?.name || 'Alex Morgan'}
                </h2>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '12px',
                    backgroundColor: '#DCFCE7',
                    color: '#15803D',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  Active Student
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
                {user?.role || 'Computer Science Student'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '10px', fontSize: '0.8rem', color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={14} />
                  {user?.email || 'alex.morgan@stanford.edu'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} />
                  Joined {user?.joinedDate || 'January 2026'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setName(user?.name || '');
                setRole(user?.role || '');
                setEmail(user?.email || '');
                setIsEditModalOpen(true);
              }}
              icon={Edit3}
            >
              Edit Profile
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsPasswordModalOpen(true)}
              icon={Lock}
            >
              Change Password
            </Button>
          </div>
        </div>
      </Card>

      {/* Learning Statistics Grid */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>
          Learning Statistics
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '18px'
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1E293B' }}>{user?.completedQuizzes || 34}</div>
              <div style={{ fontSize: '0.825rem', color: '#64748B' }}>Quizzes Solved</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1E293B' }}>{user?.averageScore || 88}%</div>
              <div style={{ fontSize: '0.825rem', color: '#64748B' }}>Average Accuracy</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1E293B' }}>{user?.topicsStudied || 42}</div>
              <div style={{ fontSize: '0.825rem', color: '#64748B' }}>Topics Mastered</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1E293B' }}>{user?.studyStreak || 12} Days</div>
              <div style={{ fontSize: '0.825rem', color: '#64748B' }}>Current Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Info Details Card */}
      <Card title="Account Information" subtitle="Platform membership details and AI compute tier">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Plan Tier</span>
            <p style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.95rem', marginTop: '2px' }}>Student Pro Edition</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>AI Inference Engine</span>
            <p style={{ fontWeight: 600, color: '#4F46E5', fontSize: '0.95rem', marginTop: '2px' }}>Google Gemini 1.5 Flash / Pro</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Language & Region</span>
            <p style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.95rem', marginTop: '2px' }}>English (United States)</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Security Verification</span>
            <p style={{ fontWeight: 600, color: '#15803D', fontSize: '0.95rem', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={16} /> Verified Student Account
            </p>
          </div>
        </div>
      </Card>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
        subtitle="Update your student display information"
      >
        <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Role / Major"
            value={role}
            placeholder="e.g. Computer Science Student"
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Button variant="outline" type="button" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setPasswordError('');
        }}
        title="Change Password"
        subtitle="Update your security credentials"
      >
        <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Minimum 6 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {passwordError && (
            <span style={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: 500 }}>
              {passwordError}
            </span>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setIsPasswordModalOpen(false);
                setPasswordError('');
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
