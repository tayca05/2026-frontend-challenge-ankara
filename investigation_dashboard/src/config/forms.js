export const JOTFORM_CONFIG = {
    // API key for all forms imported from .env file
    apiKey: import.meta.env.VITE_API_KEY1,
    
    // Form IDs imported from the .env file
    forms: {
        checkins: import.meta.env.VITE_FORM_ID_CHECKINS,
        messages: import.meta.env.VITE_FORM_ID_MESSAGES,
        sightings: import.meta.env.VITE_FORM_ID_SIGHTINGS,
        personal_notes: import.meta.env.VITE_FORM_ID_PERSONAL_NOTES,
        anonymous_tips: import.meta.env.VITE_FORM_ID_ANONYMOUS_TIPS
    },
    
    apiBase: 'https://api.jotform.com'
};

// Helper to get form config with API key
export const getFormConfig = (formName) => {
    const formId = JOTFORM_CONFIG.forms[formName];
    if (!formId) throw new Error(`Form "${formName}" not configured`);
    return {
        id: formId,
        apiKey: JOTFORM_CONFIG.apiKey
    };
};