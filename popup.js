const { json } = require("express");

// adds functionality to the button in the popup
document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('save-btn');
    saveButton.addEventListener('click', function() {
      // Code to save the session goes here.
    });
  });

  // capture the tab information
  chrome.tabs.query({}, function(tabs) {
    var tabTitles = tabs.map(function(tab) {
        return tab.title;
    })
  });

  // using fetch to make a POST request 
  fetch('https://localhost:5000/api/organize', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({tabTitles}),
  })
  .then(response => response.json())
  .then(data => {
    // do something with response data
    console.log('Success' , data)
  })
  .catch((error) => {
    console.error('Error', error);
  }) 