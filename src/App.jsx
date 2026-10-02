import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layout components
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Authenticated Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import AITutorPage from './pages/tutor/AITutorPage';
import ExplainTopicPage from './pages/explain/ExplainTopicPage';
import GenerateNotesPage from './pages/notes/GenerateNotesPage';
import GenerateQuizPage from './pages/quiz/GenerateQuizPage';
import QuizActivePage from './pages/quiz/QuizActivePage';
import QuizResultPage from './pages/quiz/QuizResultPage';
import EvaluateAnswerPage from './pages/evaluate/EvaluateAnswerPage';
import StudyPlanPage from './pages/studyplan/StudyPlanPage';
import LearningHistoryPage from './pages/history/LearningHistoryPage';
import ProgressPage from './pages/progress/ProgressPage';
import ProfilePage from './pages/profile/ProfilePage';
import SettingsPage from './pages/settings/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Student Portal Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/ai-tutor" element={<AITutorPage />} />
                <Route path="/explain" element={<ExplainTopicPage />} />
                <Route path="/notes" element={<GenerateNotesPage />} />
                <Route path="/quiz" element={<GenerateQuizPage />} />
                <Route path="/quiz/:quizId" element={<QuizActivePage />} />
                <Route path="/quiz/:quizId/result" element={<QuizResultPage />} />
                <Route path="/evaluate" element={<EvaluateAnswerPage />} />
                <Route path="/study-plan" element={<StudyPlanPage />} />
                <Route path="/history" element={<LearningHistoryPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
