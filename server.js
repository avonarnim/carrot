// here we're setting up the server and defining routes
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);
const app = express();

app.use(express.json()); // to parse JSON

app.get('/api/organize', async (req, res) => {
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "Hello world"}],
      });
      console.log(chatCompletion.data.choices[0].message);
        // code to call the OpenAI API goes here
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on port $[PORT]'));

// here we created a new Express app, added middleware to parse JSON request bodies, defined a POST route and started the server

const axios = require('axios');
// here we're requiring the axios package to make requests to the OpenAI API

// loading variables
require('dotenv').config();
const apikey = process.env.open_api_key;
