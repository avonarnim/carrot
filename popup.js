// const { json } = require("express");
document.getElementById('organizeButton').addEventListener('click', function() {
    // fetching titles of the currently open tabs
    chrome.tabs.query({}, function(tabs) {
        var tabTitles = tabs.map(tab => tab.title);
        
        // making request to the server here
        fetch('http://localhost:5000/api/organize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tabTitles: tabTitles
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // check what is returned here

            // Save the tabs and data to storage
            chrome.storage.local.set({tabs: tabTitles, data: data});

            displayData(data);
        })
        .catch((error) => {
            console.error('Error', error);
        });
    });
});

// Function to display the data
function displayData(data) {
    if (!data.choices) {
        console.log('Choices is not defined in the response');
        return;
    }

    if (data.choices.length > 0 && data.choices[0].message) {
        let content = data.choices[0].message.content;
        let categories = JSON.parse(content);

        let resultElement = document.getElementById('result');

        // iterate through categories
        for (let category in categories) {
            let categoryElement = document.createElement('div');
            categoryElement.textContent = category;
            resultElement.appendChild(categoryElement);

            let itemsElement = document.createElement('ul');

            // iterate through items in each category
            categories[category].forEach(item => {
                let itemElement = document.createElement('li');
                itemElement.textContent = item;
                itemsElement.appendChild(itemElement);
            });

            resultElement.appendChild(itemsElement);
        }
    }
    else {
        console.log('data.choices[0].message is not available');
    }
}

// When the popup is opened, check if there is saved data and display it
chrome.storage.local.get(['tabs', 'data'], function(result) {
    if (result.tabs && result.data) {
        displayData(result.data);
    }
});

// document.getElementById('organizeButton').addEventListener('click', function() {
//     // fetching titles of the currently open tabs
//     chrome.tabs.query({}, function(tabs) {
//         var tabTitles = tabs.map(tab => tab.title);

//         // making request to the server here
//         fetch('http://localhost:5000/api/organize', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         tabTitles: tabTitles
//     }),
// })
// .then(response => response.json())
// .then(data => {
//     console.log(data); // check what is returned here

//     if (!data.choices) {
//         console.log('Choices is not defined in the response');
//         return;
//     }

//     if (data.choices.length > 0 && data.choices[0].message) {
//         let content = data.choices[0].message.content;
//         let categories = JSON.parse(content);

//         let resultElement = document.getElementById('result');

//         // iterate through categories
//         for (let category in categories) {
//             let categoryElement = document.createElement('div');
//             categoryElement.textContent = category;
//             resultElement.appendChild(categoryElement);

//             let itemsElement = document.createElement('ul');

//             // iterate through items in each category
//             categories[category].forEach(item => {
//                 let itemElement;
//                 // Check if item is a URL
//                 if (/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i.test(item)) {
//                     // Create link element for URL
//                     itemElement = document.createElement('a');
//                     itemElement.href = item;
//                     itemElement.target = "_blank";  // Open in new tab
//                 }
//                  else {
//                     // Create plain text element for non-URL
//                     itemElement = document.createElement('li');
//                 }
//                 itemElement.textContent = item;
//                 itemsElement.appendChild(itemElement);
//             });

//             resultElement.appendChild(itemsElement);
//         }
//     }
//     else {
//         console.log('data.choices[0].message is not available');
//     }
// })
// .catch((error) => {
//     console.error('Error', error);
// });
//     });
// });
