import { getFormConfig, JOTFORM_CONFIG } from "../config/forms";

/**
 * Fetch submissions from a specific form
 * @param {string} formName - Name of form (checkins, messages, sightings, etc.)
 * @param {object} options - Query options
 * @returns {Promise<array>} Array of submissions
 */
export const getFormSubmissions = async (formName, options = {}) => {
  try {
    const { id, apiKey } = getFormConfig(formName);
    const limit = options.limit || 100;
    const offset = options.offset || 0;
    
    const url = new URL(`${JOTFORM_CONFIG.apiBase}/form/${id}/submissions`);
    url.searchParams.append('apiKey', apiKey);
    url.searchParams.append('limit', limit);
    url.searchParams.append('offset', offset);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.responseCode !== 200) {
      throw new Error(`Jotform API error: ${data.message}`);
    }
    
    return data.content || [];
  } catch (error) {
    console.error(`Error fetching ${formName} submissions:`, error);
    throw error;
  }
};

/**
 * Fetch all submissions from all forms
 * @returns {Promise<object>} Object with form names as keys, submissions as values
 */
export const getAllSubmissions = async () => {
  const formNames = Object.keys(JOTFORM_CONFIG.forms);
  const results = {};
  
  try {
    const promises = formNames.map(async (formName) => {
      const submissions = await getFormSubmissions(formName);
      results[formName] = submissions;
    });
    
    await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching all submissions:', error);
    throw error;
  }
};

/**
 * Fetch a single submission by ID
 * @param {string} formName - Name of form
 * @param {string} submissionId - Submission ID
 * @returns {Promise<object>} Submission details
 */
export const getSubmission = async (formName, submissionId) => {
  try {
    const { id, apiKey } = getFormConfig(formName);
    
    const url = `${JOTFORM_CONFIG.apiBase}/submission/${submissionId}?apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.responseCode !== 200) {
      throw new Error(`Jotform API error: ${data.message}`);
    }
    
    return data.content;
  } catch (error) {
    console.error(`Error fetching submission ${submissionId}:`, error);
    throw error;
  }
};

/**
 * Extract all unique people from all form submissions
 * @param {object} allData - Object with form names as keys, submissions as values
 * @returns {Promise<object>} Object with people and their appearances in forms
 */
export const extractPeople = (allData) => {
  const people = {};

  // Field mappings for different forms (which field contains person name)
  const personNameFields = {
    sightings: '2',      // personName field
    checkins: '2',       // Adjust based on actual field structure
    messages: '2',       // Adjust based on actual field structure
    personal_notes: '2', // Adjust based on actual field structure
    anonymous_tips: null // Anonymous tips may not have person names
  };

  // Process each form
  Object.entries(allData).forEach(([formName, submissions]) => {
    if (!Array.isArray(submissions)) return;

    const personField = personNameFields[formName];
    if (!personField) return;

    submissions.forEach((submission) => {
      const personName = submission.answers?.[personField]?.answer;
      
      if (personName && personName.trim()) {
        // Initialize person record if not exists
        if (!people[personName]) {
          people[personName] = {
            name: personName,
            submissions: [],        // Forms they submitted
            mentions: [],           // Forms they were mentioned in
            totalAppearances: 0
          };
        }

        // Add this form appearance as a submission (they filled out the form)
        people[personName].submissions.push({
          form: formName,
          submissionId: submission.id,
          date: submission.created_at,
          ip: submission.ip,
          status: submission.status
        });
        people[personName].totalAppearances++;
      }
    });
  });

  // Sort by number of appearances
  const sortedPeople = Object.values(people).sort((a, b) => b.totalAppearances - a.totalAppearances);
  
  return sortedPeople;
};

