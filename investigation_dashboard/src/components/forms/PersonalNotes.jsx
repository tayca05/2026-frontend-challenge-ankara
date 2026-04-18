import './forms.css';

export function PersonalNotesForm({ personName, allData }) {
  if (!allData?.personal_notes || allData.personal_notes.length === 0) {
    return <div className="form-no-data">No personal notes data available</div>;
  }

  // Filter submissions for this person
  const personNotes = allData.personal_notes.filter(
    submission => submission.answers?.['2']?.answer === personName
  );

  if (personNotes.length === 0) {
    return <div className="form-no-data">No personal notes for {personName}</div>;
  }

  return (
    <div className="form-submissions">
      {personNotes.map((note, idx) => (
        <div key={note.id} className="submission-item">
          <div className="submission-header">
            <h4>Personal Note #{idx + 1}</h4>
            <span className="submission-date">{note.created_at}</span>
          </div>

          <div className="submission-fields">
            {Object.entries(note.answers).map(([fieldId, field]) => {
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
