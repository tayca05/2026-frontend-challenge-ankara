import './forms.css';

export function MessagesForm({ personName, allData }) {
  if (!allData?.messages || allData.messages.length === 0) {
    return <div className="form-no-data">No messages data available</div>;
  }

  // Filter submissions for this person
  const personMessages = allData.messages.filter(
    submission => submission.answers?.['2']?.answer === personName
  );

  if (personMessages.length === 0) {
    return <div className="form-no-data">No messages for {personName}</div>;
  }

  return (
    <div className="form-submissions">
      {personMessages.map((message, idx) => (
        <div key={message.id} className="submission-item">
          <div className="submission-header">
            <h4>Message #{idx + 1}</h4>
            <span className="submission-date">{message.created_at}</span>
          </div>

          <div className="submission-fields">
            {Object.entries(message.answers).map(([fieldId, field]) => {
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
