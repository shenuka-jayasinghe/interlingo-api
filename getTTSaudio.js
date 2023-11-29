const fetch = require('node-fetch');

async function getTTSAudio(text, languageCode) {
  const serverURL = 'http://localhost:3000/text-to-speech'; // Replace with the actual server URL

  const requestBody = {
    text,
    languageCode,
  };

  try {
    const response = await fetch(serverURL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const audioBuffer = await response.buffer();
      console.log('audio received')
      return audioBuffer;
    } else {
      throw new Error(`Server returned an error: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = getTTSAudio;
