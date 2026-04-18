import './forms.css';

export function SightingsForm({ personName, allData }) {
  if (!allData?.sightings || allData.sightings.length === 0) {
    return <div className="form-no-data">No sightings data available</div>;
  }

  // Filter submissions for this person
  const personSightings = allData.sightings.filter(
    submission => submission.answers?.['2']?.answer === personName
  );

  if (personSightings.length === 0) {
    return <div className="form-no-data">No sightings for {personName}</div>;
  }

  return (
    <div className="form-submissions">
      {personSightings.map((sighting, idx) => (
        <div key={sighting.id} className="submission-item">
          <div className="submission-header">
            <h4>Sighting #{idx + 1}</h4>
            <span className="submission-date">{sighting.created_at}</span>
          </div>

          <div className="submission-fields">
            {Object.entries(sighting.answers).map(([fieldId, field]) => {
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
