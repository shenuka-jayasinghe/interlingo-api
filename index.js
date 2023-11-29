// run using 'node index.js' in terminal

const fetch = require('node-fetch');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080
const openaiapi = require('./openaiapi'); 
const deeplapi = require('./deeplapi')
const googleapi = require('./googleapi')
const getLanguageCode = require('./getLanguageCode')
const getTTSAudio = require('./getTTSaudio')
let target_lang = ''
let prompt = '';
app.use(express.json()); // Parses JSON
// Configure CORS to allow requests from localhost:4200
// app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors());


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.get('/healthcheck', (req, res) => {
  res.status(200).send({msg:'healthy'})
})

app.post('/prompt', async (req, res) => {
  const { text } = req.body;
  const { language } = req.body
  if (!text || !language) {
    res.status(418).send('language or text missing: Please request with the following format: { "text": "prompt for chatGPT", "language": "DE" }');
  } else {
    
    // Assign the 'text' to 'prompt' globally
    prompt = text;
    console.log("prompt sent sucessfully: ", prompt)
    
    try {

      //Assign Tokens
      const assignedTokens = await openaiapi.assignTokens(prompt)

      // Call the fetchOpenAIResponse function from openai.js
      const generatedText = await openaiapi.fetchOpenAIResponse(prompt, assignedTokens);
      console.log("OpenAPI responds: ", generatedText)

      // Call the fetchDeepLRepsonse function from deeplapi.js
      const translation = await deeplapi.fetchDeepLResponse(generatedText, language);
      console.log("DeepL translates: ", translation)

      //get correct language code for google voice list
      const languageCode = getLanguageCode(language)


      // Call the googeAPI response
      // const ttsAudio = getTTSAudio(translation, languageCode)



      // Send translation as response
      res.status(200).send({
        generatedText: generatedText,
        translatedText: translation,
        languageCode: languageCode
        // textToSpeech: ttsAudio
      });


    } catch (error) {
      res.status(500).send('An error occurred');
    }
  }
});