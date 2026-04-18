import './forms.css';

export function CheckinsForm({ personName, allData }) {
  if (!allData?.checkins || allData.checkins.length === 0) {
    return <div className="form-no-data">No check-in data available</div>;
  }

  // Filter submissions for this person
  const personCheckins = allData.checkins.filter(
    submission => submission.answers?.['2']?.answer === personName
  );

  if (personCheckins.length === 0) {
    return <div className="form-no-data">No check-ins for {personName}</div>;
  }

  return (
    <div className="form-submissions">
      {personCheckins.map((checkin, idx) => (
        <div key={checkin.id} className="submission-item">
          <div className="submission-header">
            <h4>Check-in #{idx + 1}</h4>
            <span className="submission-date">{checkin.created_at}</span>
          </div>

          <div className="submission-fields">
            {Object.entries(checkin.answers).map(([fieldId, field]) => {
              if (field.type === 'control_head' || field.type === 'control_button') {
                return null;
              }

              return (
                <div key={fieldId} className="field-item">
                  <label className="field-label">{field.text}</label>
                  <p className="field-value">{field.answer || '(No response)'}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
