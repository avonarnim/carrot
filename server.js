// here we're setting up the server and defining routes
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);
const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON

app.post('/api/organize', async (req, res) => {
    try {
        // extracting tab titles from request's body
        const { tabTitles } = req.body;

        // preparing prompt for OpenAI
        const prompt = `Please organize these website tab titles into at most five relevant categories(titled by a relevant word) in a JSON format. ${tabTitles.join(', ')}`;
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0613",
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
        });
        console.log(chatCompletion.data.choices[0].message);

        // sends result back to the client
        res.json(chatCompletion.data)
    } catch(err) {
        console.log(err);
        console.error(err);
        // Send an error response back to the client
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on port $[PORT]'));

// here we created a new Express app, added middleware to parse JSON request bodies, defined a POST route and started the server

const axios = require('axios');
// here we're requiring the axios package to make requests to the OpenAI API

