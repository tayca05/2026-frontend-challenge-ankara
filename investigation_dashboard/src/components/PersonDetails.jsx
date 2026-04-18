import { useState } from 'react';
import './PersonDetails.css';
import { CheckinsForm } from './forms/Checkins';
import { SightingsForm } from './forms/Sightings';
import { MessagesForm } from './forms/Messages';
import { PersonalNotesForm } from './forms/PersonalNotes';
import { AnonymousTipsForm } from './forms/AnonymousTips';

export function PersonDetails({ person, allData, onClose }) {
  const [activeTab, setActiveTab] = useState('checkins');

  if (!person) {
    return (
      <div className="person-details-empty">
        <p>Select a person to view details</p>
      </div>
    );
  }

  const formTabs = [
    { id: 'checkins', label: 'Check-ins', component: CheckinsForm, count: person.submissions.filter(s => s.form === 'checkins').length },
    { id: 'sightings', label: 'Sightings', component: SightingsForm, count: person.submissions.filter(s => s.form === 'sightings').length },
    { id: 'messages', label: 'Messages', component: MessagesForm, count: person.submissions.filter(s => s.form === 'messages').length },
    { id: 'personal_notes', label: 'Personal Notes', component: PersonalNotesForm, count: person.submissions.filter(s => s.form === 'personal_notes').length },
    { id: 'anonymous_tips', label: 'Anonymous Tips', component: AnonymousTipsForm, count: person.submissions.filter(s => s.form === 'anonymous_tips').length },
  ];

  const ActiveComponent = formTabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="person-details-container">
      {/* Header */}
      <div className="person-details-header">
        <div className="person-header-content">
          <h2>{person.name}</h2>
          <div className="person-stats">
            <span className="stat">Total Submissions: {person.totalAppearances}</span>
            <span className="stat">Forms Submitted: {formTabs.filter(t => t.count > 0).length}</span>
          </div>
        </div>
        <button className="person-details-close" onClick={onClose} aria-label="Close details">×</button>
      </div>

      {/* Tabs */}
      <div className="person-details-tabs">
        {formTabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''} ${tab.count === 0 ? 'disabled' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            disabled={tab.count === 0}
          >
            {tab.label}
            {tab.count > 0 && <span className="tab-count">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="person-details-content">
        {ActiveComponent ? (
          <ActiveComponent personName={person.name} allData={allData} />
        ) : (
          <div className="no-data">No submissions for this form</div>
        )}
      </div>
    </div>
  );
}