import { useState } from 'react';
import './PeopleList.css';

export function PeopleList({ people, onSelectPerson }) {
  const [expandedPerson, setExpandedPerson] = useState(null);
  const [sortBy, setSortBy] = useState('appearances'); // 'appearances' or 'name'

  if (!people || people.length === 0) {
    return <p>No people found in submissions.</p>;
  }

  // Sort people
  let sorted = [...people];
  if (sortBy === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sorted.sort((a, b) => b.totalAppearances - a.totalAppearances);
  }

  return (
    <div className="people-list-container">
      {/* Controls */}
      <div className="people-list-controls">
        <div>
          <label className="people-list-controls-label">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="people-list-select"
          >
            <option value="appearances">Most Active</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
        <div>
          <p className="people-list-controls-summary">
            Total: <strong>{people.length}</strong> unique people
          </p>
        </div>
      </div>

      {/* People Grid */}
      <div className="people-grid">
        {sorted.map((person) => (
          <div
            key={person.name}
            className="person-card"
          >
            {/* Person Header */}
            <div
              className={`person-header ${expandedPerson === person.name ? 'expanded' : ''}`}
              onClick={() => onSelectPerson(person)}
            >
              <div className="person-name-section">
                <h3>
                  {person.name}
                </h3>
                <p>
                  Submitted {person.submissions.length} form{person.submissions.length !== 1 ? 's' : ''}
                  {person.mentions && person.mentions.length > 0 && ` • Mentioned in ${person.mentions.length}`}
                </p>
              </div>
            </div>

            {/* Expanded - Form Appearances */}
            {expandedPerson === person.name && (
              <div className="person-expanded">
                {/* Mentions Section */}
                {person.mentions && person.mentions.length > 0 && (
                  <div>
                    <p className="person-section-title mentions">
                      Mentioned in Forms
                    </p>

                    <div className="mentions-grid">
                      {person.mentions.map((mention, idx) => (
                        <div
                          key={idx}
                          className={`mention-card ${mention.form}`}
                        >
                          <div className="mention-header">
                            <div>
                              <p className={`mention-form-name ${mention.form}`}>
                                {mention.form.charAt(0).toUpperCase() + mention.form.slice(1)}
                              </p>
                              <p className="mention-date">
                                {mention.date}
                              </p>
                            </div>
                            <code className="mention-id">
                              {mention.submissionId.slice(-8)}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="person-summary">
                  Ready for record linking across forms
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}