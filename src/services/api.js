import axios from 'axios';
import {
  INITIAL_USER,
  INITIAL_STATS,
  INITIAL_ACTIVITIES,
  WEEKLY_PROGRESS,
  TOPIC_BREAKDOWN,
  getMockExplanation,
  getMockNotes,
  getMockQuiz,
  getMockEvaluation,
  getMockStudyPlan
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Attach Authorization Bearer token if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('edugenie_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Helper for simulated delay when offline
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// Centralized API Service
export const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      try {
        const res = await apiClient.post('/auth/login', { email, password });
        return res.data;
      } catch (err) {
        console.warn('Backend unavailable, using local mock auth session', err.message);
        await delay(500);
        const mockUser = {
          ...INITIAL_USER,
          email: email || INITIAL_USER.email,
          name: email ? email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) : INITIAL_USER.name
        };
        const token = 'mock_jwt_token_' + Date.now();
        localStorage.setItem('edugenie_token', token);
        localStorage.setItem('edugenie_user', JSON.stringify(mockUser));
        return { success: true, token, user: mockUser };
      }
    },

    register: async (fullName, email, password) => {
      try {
        const res = await apiClient.post('/auth/register', { name: fullName, email, password });
        return res.data;
      } catch (err) {
        console.warn('Backend unavailable, using local mock registration', err.message);
        await delay(600);
        const mockUser = {
          ...INITIAL_USER,
          name: fullName,
          email: email
        };
        const token = 'mock_jwt_token_' + Date.now();
        localStorage.setItem('edugenie_token', token);
        localStorage.setItem('edugenie_user', JSON.stringify(mockUser));
        return { success: true, token, user: mockUser };
      }
    },

    getMe: async () => {
      try {
        const res = await apiClient.get('/auth/me');
        return res.data;
      } catch (err) {
        const saved = localStorage.getItem('edugenie_user');
        return saved ? JSON.parse(saved) : INITIAL_USER;
      }
    }
  },

  // AI Learning Features
  ai: {
    tutor: async (message, history = []) => {
      try {
        const res = await apiClient.post('/ai/tutor', { message, history });
        return res.data;
      } catch (err) {
        await delay(800);
        // Realistic EdTech generative response
        let reply = `That is an excellent question about **${message.slice(0, 30)}...**! \n\nHere is how to understand this step-by-step:\n\n1. **Core Concept**: Break down the problem into smaller atomic components.\n2. **Practical Application**: In modern systems, this pattern ensures high reliability and maintainable logic.\n3. **Key Takeaway**: Always verify your boundary conditions and keep functions pure where possible.\n\nWould you like me to generate a concrete code example or explain this with an everyday analogy?`;
        
        if (message.toLowerCase().includes('example') || message.toLowerCase().includes('code')) {
          reply = `Here is a practical code example illustrating this concept:\n\n\`\`\`javascript\n// Clean implementation example\nfunction processLearningData(items) {\n  return items\n    .filter(item => item.completed)\n    .map(item => ({\n      id: item.id,\n      score: Math.round(item.score * 1.1)\n    }));\n}\n\`\`\`\n\n**Explanation:**\n- We filter elements meeting the target predicate.\n- We map into an immutable projection.\n- All state transitions remain predictable.`;
        }

        return {
          reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
    },

    explain: async ({ subject, topic, difficulty }) => {
      try {
        const res = await apiClient.post('/ai/explain', { subject, topic, difficulty });
        return res.data;
      } catch (err) {
        await delay(900);
        return getMockExplanation(subject, topic, difficulty);
      }
    },

    generateNotes: async ({ subject, topic, instructions }) => {
      try {
        const res = await apiClient.post('/ai/notes', { subject, topic, instructions });
        return res.data;
      } catch (err) {
        await delay(1000);
        return getMockNotes(subject, topic, instructions);
      }
    },

    generateQuiz: async ({ subject, topic, difficulty, count }) => {
      try {
        const res = await apiClient.post('/ai/quiz', { subject, topic, difficulty, count });
        return res.data;
      } catch (err) {
        await delay(1100);
        return getMockQuiz(subject, topic, difficulty, count);
      }
    },

    evaluateAnswer: async ({ question, answer }) => {
      try {
        const res = await apiClient.post('/ai/evaluate', { question, answer });
        return res.data;
      } catch (err) {
        await delay(1000);
        return getMockEvaluation(question, answer);
      }
    },

    studyPlan: async ({ subject, topics, days, dailyHours, goal }) => {
      try {
        const res = await apiClient.post('/ai/study-plan', { subject, topics, days, dailyHours, goal });
        return res.data;
      } catch (err) {
        await delay(1000);
        return getMockStudyPlan(subject, topics, days, dailyHours, goal);
      }
    }
  },

  // Learning Analytics & History
  learning: {
    getStats: async () => {
      try {
        const res = await apiClient.get('/learning/stats');
        return res.data;
      } catch (err) {
        return INITIAL_STATS;
      }
    },

    getHistory: async ({ type, search } = {}) => {
      try {
        const res = await apiClient.get('/learning/history', { params: { type, search } });
        return res.data;
      } catch (err) {
        const savedHistory = localStorage.getItem('edugenie_history');
        let list = savedHistory ? JSON.parse(savedHistory) : INITIAL_ACTIVITIES;
        
        if (type && type !== 'All') {
          list = list.filter(item => item.type.toLowerCase() === type.toLowerCase());
        }
        if (search) {
          const s = search.toLowerCase();
          list = list.filter(item => item.title.toLowerCase().includes(s) || item.topic.toLowerCase().includes(s));
        }
        return list;
      }
    },

    saveActivity: async (activity) => {
      try {
        const res = await apiClient.post('/learning/activity', activity);
        return res.data;
      } catch (err) {
        const savedHistory = localStorage.getItem('edugenie_history');
        const list = savedHistory ? JSON.parse(savedHistory) : [...INITIAL_ACTIVITIES];
        const newActivity = {
          id: 'act_' + Date.now(),
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          timeAgo: 'Just now',
          ...activity
        };
        list.unshift(newActivity);
        localStorage.setItem('edugenie_history', JSON.stringify(list));
        return newActivity;
      }
    },

    getProgress: async () => {
      try {
        const res = await apiClient.get('/learning/progress');
        return res.data;
      } catch (err) {
        return {
          weekly: WEEKLY_PROGRESS,
          topicDistribution: TOPIC_BREAKDOWN,
          totalHours: 15.5,
          studyStreak: 12,
          masteryScore: 88,
          accuracyRate: '92%'
        };
      }
    }
  }
};

export default apiClient;
