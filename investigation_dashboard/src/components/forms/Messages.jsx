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
    <div className="messages-chat">
      {personMessages.map((message) => {
        const date = new Date(message.created_at);
        const dateStr = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        const timeStr = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });

        // Get all message content fields (excluding person name and control fields)
        const messageContent = Object.entries(message.answers)
          .filter(([fieldId, field]) => {
            return fieldId !== '2' && field.type !== 'control_head' && field.type !== 'control_button';
          })
          .map(([fieldId, field]) => field.answer)
          .filter(answer => answer)[0]; // Get the first non-empty answer as main message

        // Get all other data for display
        const otherData = Object.entries(message.answers)
          .filter(([fieldId, field]) => {
            return fieldId !== '2' && fieldId !== '3' && field.type !== 'control_head' && field.type !== 'control_button';
          });

        // Try to find recipient/other party (field 3 might be companion/recipient)
        const recipient = message.answers?.['3']?.answer || 'Unknown';

        return (
          <div key={message.id} className="message-group">
            <div className="message-date">{dateStr}</div>
            <div className="message-flow">
              <div className="message-from">From: <strong>{personName}</strong></div>
              <div className="message-to">To: <strong>{recipient}</strong></div>
            </div>
            <div className="message-bubble-wrapper">
              <div className="message-bubble">
                <p className="message-text">{messageContent || 'No message'}</p>
              </div>
              <span className="message-time">{timeStr}</span>
            </div>
            <div className="message-metadata">
              {otherData.map(([fieldId, field]) => (
                <div key={fieldId} className="metadata-item">
                  <span className="metadata-label">{field.text}:</span>
                  <span className="metadata-value">{field.answer}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
