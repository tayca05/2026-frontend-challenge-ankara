// Test script to find API key to form ID mappings
import fs from 'fs';
import path from 'path';

// Read .env file
const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const apiKeys = {
  first: envVars.VITE_API_KEY1,
  second: envVars.VITE_API_KEY2,
  third: envVars.VITE_API_KEY3
};

// Add all 5 form IDs here
const formIds = [
  '261065067494966',
  '261065765723966',
  '261065244786967',
  '261065509008958',
  '261065875889981'
];

const testMapping = async () => {
  const results = {};
  
  for (const [keyName, apiKey] of Object.entries(apiKeys)) {
    console.log(`\n--- Testing with ${keyName} API key (${apiKey.slice(0, 8)}...) ---`);
    
    for (const formId of formIds) {
      try {
        const response = await fetch(
          `https://api.jotform.com/form/${formId}?apiKey=${apiKey}`
        );
        const data = await response.json();
        
        if (data.responseCode === 200) {
          console.log(`✅ Form ${formId} → ${keyName}`);
          results[formId] = keyName;
        } else {
          console.log(`❌ Form ${formId} → ${keyName}: ${data.message}`);
        }
      } catch (error) {
        console.log(`❌ Form ${formId} → ${keyName}: ${error.message}`);
      }
    }
  }
  
  console.log('\n\n=== MAPPING SUMMARY ===');
  console.log(JSON.stringify(results, null, 2));
};

testMapping();
