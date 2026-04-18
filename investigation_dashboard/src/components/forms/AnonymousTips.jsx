import './forms.css';

export function AnonymousTipsForm({ personName, allData }) {
  if (!allData?.anonymous_tips || allData.anonymous_tips.length === 0) {
    return <div className="form-no-data">No anonymous tips data available</div>;
  }

  // Filter submissions for this person (if they have a name field)
  const personTips = allData.anonymous_tips.filter(
    submission => submission.answers?.['2']?.answer === personName || personName === 'Anonymous'
  );

  if (personTips.length === 0) {
    return <div className="form-no-data">No anonymous tips for {personName}</div>;
  }

  return (
    <div className="form-submissions">
      {personTips.map((tip, idx) => (
        <div key={tip.id} className="submission-item">
          <div className="submission-header">
            <h4>Anonymous Tip #{idx + 1}</h4>
            <span className="submission-date">{tip.created_at}</span>
          </div>

          <div className="submission-fields">
            {Object.entries(tip.answers).map(([fieldId, field]) => {
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

          <div className="submission-meta">
            <span>ID: {tip.id.slice(-8)}</span>
            <span>Status: {tip.status}</span>
            <span>IP: {tip.ip}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
