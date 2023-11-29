// run using 'node index.js' in terminal

const fetch = require('node-fetch');

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const ENV = process.env.NODE_ENV
const pathToEnvFile = `${__dirname}/.env.local`
require("dotenv").config({ path : pathToEnvFile })
const OPENAPIKEY = process.env.OPENAPIKEY
const deepLapiKey = OPENAPIKEY;
const openAIapiKey = OPENAPIKEY;


//Assign tokens function
async function assignTokens(prompt){
  const sentenceRegex = /\d*\ssentences/g
  if (sentenceRegex.test(prompt)){
    const sentencePrompt = prompt.match(sentenceRegex)
    const sentencePromptArr = sentencePrompt[0].split('')
    const sentenceNumber = Number(sentencePromptArr.filter( letter => /\d/.test(letter) ).join(''))
    const tokensNeeded = 30 * sentenceNumber
    return tokensNeeded
  }
}


// Function to make the OpenAI API request
async function fetchOpenAIResponse(prompt, assignedTokens) {
  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAIapiKey}`,
    },
    body: JSON.stringify({
      prompt,
      max_tokens: assignedTokens
      // max_tokens: 300, // Adjust the max_tokens as needed
    }),
  };

  try {
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', requestData);
    if (!response.ok) {
      throw new Error('Failed to fetch data from OpenAI API');
    }
    console.log(requestData.body) //DELETE AFTER TESTING
    const data = await response.json();
    const generatedText = data.choices[0].text;
    return generatedText;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = {
  fetchOpenAIResponse, assignTokens
};
