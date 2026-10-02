import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  History,
  Search,
  Filter,
  BrainCircuit,
  FileText,
  MessageSquare,
  CheckCircle2,
  CalendarDays,
  Sparkles,
  ArrowUpDown,
  Eye,
  Clock
} from 'lucide-react';
import { api } from '../../services/api';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';

const FILTERS = ['All', 'Quiz', 'Notes', 'AI Tutor', 'Evaluation', 'Study Plan'];

const LearningHistoryPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [activities, setActivities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    fetchHistory();
  }, [selectedFilter]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await api.learning.getHistory({
        type: selectedFilter === 'All' ? undefined : selectedFilter,
        search: searchQuery
      });
      setActivities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHistory();
  };

  const getActivityBadge = (type) => {
    switch (type) {
      case 'Quiz':
        return { color: '#B45309', bg: '#FEF3C7', icon: BrainCircuit };
      case 'Notes':
        return { color: '#15803D', bg: '#DCFCE7', icon: FileText };
      case 'AI Tutor':
        return { color: '#6D28D9', bg: '#F3F0FF', icon: MessageSquare };
      case 'Evaluation':
        return { color: '#BE185D', bg: '#FCE7F3', icon: CheckCircle2 };
      case 'Study Plan':
        return { color: '#0E7490', bg: '#CFFAFE', icon: CalendarDays };
      default:
        return { color: '#4338CA', bg: '#EEF2FF', icon: Sparkles };
    }
  };

  const filteredList = activities.filter((item) => {
    if (selectedFilter !== 'All' && item.type.toLowerCase() !== selectedFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const displayedList = filteredList.slice(0, visibleCount);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <History size={28} color="#8B5CF6" />
          <span>Learning History</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '4px' }}>
          Review your past study activities, notes generated, quizzes completed, and evaluated answers.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <Card style={{ padding: '20px 24px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setSelectedFilter(f);
                  setVisibleCount(8);
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: selectedFilter === f ? '1.5px solid #4F46E5' : '1.5px solid #E2E8F0',
                  backgroundColor: selectedFilter === f ? '#EEF2FF' : '#FFFFFF',
                  color: selectedFilter === f ? '#4F46E5' : '#64748B',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}
              />
              <input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '9px 12px 9px 38px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.875rem',
                  width: '100%'
                }}
              />
            </div>
            <Button type="submit" variant="secondary" size="sm">
              Search
            </Button>
          </form>
        </div>
      </Card>

      {/* History Items Table / Card List */}
      <Card>
        {loading ? (
          <LoadingSpinner text="Fetching study history logs..." size={28} />
        ) : displayedList.length === 0 ? (
          <EmptyState
            icon={History}
            title="No activities recorded"
            description="You have not recorded any learning activities matching your filter criteria yet."
          />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Type
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Activity & Title
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Topic
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Date & Time
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Score / Status
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', textAlign: 'right' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedList.map((item) => {
                  const badge = getActivityBadge(item.type);
                  const Icon = badge.icon;

                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* Type Badge */}
                      <td style={{ padding: '16px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            backgroundColor: badge.bg,
                            color: badge.color,
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}
                        >
                          <Icon size={13} />
                          <span>{item.type}</span>
                        </span>
                      </td>

                      {/* Title */}
                      <td style={{ padding: '16px', fontWeight: 600, color: '#1E293B', fontSize: '0.9rem', maxWidth: '280px' }}>
                        {item.title}
                      </td>

                      {/* Topic */}
                      <td style={{ padding: '16px', color: '#64748B', fontSize: '0.85rem' }}>
                        {item.topic}
                      </td>

                      {/* Date */}
                      <td style={{ padding: '16px', color: '#64748B', fontSize: '0.825rem' }}>
                        <div>{item.date}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{item.timeAgo}</div>
                      </td>

                      {/* Score or Status */}
                      <td style={{ padding: '16px' }}>
                        {item.score ? (
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '12px',
                              backgroundColor: '#DCFCE7',
                              color: '#15803D',
                              fontSize: '0.8rem',
                              fontWeight: 700
                            }}
                          >
                            {item.score}
                          </span>
                        ) : (
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '12px',
                              backgroundColor: '#F1F5F9',
                              color: '#475569',
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            {item.status}
                          </span>
                        )}
                      </td>

                      {/* Details Trigger */}
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedItem(item)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#4F46E5',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.85rem',
                            fontWeight: 600
                          }}
                        >
                          <Eye size={15} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Load more button */}
            {displayedList.length < filteredList.length && (
              <div style={{ textAlign: 'center', marginTop: '20px', padding: '10px 0' }}>
                <Button variant="outline" size="sm" onClick={() => setVisibleCount((prev) => prev + 8)}>
                  Load More Entries ({filteredList.length - displayedList.length} remaining)
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Details View Modal */}
      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || 'Activity Record'}
        subtitle={`Logged on ${selectedItem?.date}`}
      >
        {selectedItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: '#F8FAFC', padding: '14px', borderRadius: '12px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Category</span>
                <p style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>{selectedItem.type}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Subject / Topic</span>
                <p style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>{selectedItem.topic}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Result / Score</span>
                <p style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>{selectedItem.score || 'N/A'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Status</span>
                <p style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>{selectedItem.status}</p>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
              This activity was saved to your permanent EduGenie record and is synced across your account metrics.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Button variant="primary" size="sm" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LearningHistoryPage;
