const express = require('express');
const app = express();
const port = 9090;
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const cors = require('cors');
app.use(cors());
const ENV = process.env.NODE_ENV
const pathToEnvFile = `${__dirname}/.env.local`
require("dotenv").config({ path : pathToEnvFile })
const GOOGLEKEY = process.env.GOOGLEKEY

app.use(express.json()); // Enable JSON request parsing

app.post('/text-to-speech', async (req, res) => {
  const client = new textToSpeech.TextToSpeechClient({
    credentials: JSON.parse(GOOGLEKEY)
  });

  const { text, languageCode } = req.body; // Assuming the client sends a JSON object with a "text" property
  console.log("Received to googleapi server on localhost 9090/text-to-speech:, ", req.body)
  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'LINEAR16' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const audioBuffer = Buffer.from(response.audioContent, 'base64');

    // Send the audio data as a response
    res.setHeader('Content-Type', 'audio/wav');
    res.send(audioBuffer);
    console.log("AUDIO SENT!")
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`google TTS server is running on port ${port}`);
});
