const axios = require('axios');

const testTabTitles = ['Google', 'StackOverflow', 'GitHub', 'YouTube', 'OpenAI'];

axios.post('localhost:5000/api/organize', { tabTitles: testTabTitles })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
