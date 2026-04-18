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

