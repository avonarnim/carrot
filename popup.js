document.getElementById('organizeButton').addEventListener('click', function() {
    // fetching titles of the currently open tabs

    // Clear the results
    let resultElement = document.getElementById('result');
    resultElement.textContent = '';

    chrome.tabs.query({}, function(tabs) {
        document.getElementById('spinner').style.display = 'block';
        var tabsData = tabs.map(tab => ({title: tab.title, url: tab.url}));
        var tabTitles = tabsData.map(tab => tab.title); // send only the titles to the server
        
        // making request to the server here
        console.log(tabsData);
        fetch('http://localhost:5000/api/organize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tabsData: tabsData
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // check what is returned here

            // Save the tabs and data to storage
            chrome.storage.local.set({tabs: tabsData, data: data});

            displayData(data, tabsData);
            document.getElementById('spinner').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error', error);
            document.getElementById('spinner').style.display = 'none';
        });
    });
});

// Function to display the data
function displayData(data, tabsData) {
    if (!data.choices) {
        console.log('Choices is not defined in the response');
        return;
    }

    if (data.choices.length > 0 && data.choices[0].message) {
        let content = data.choices[0].message.content;
        let categories = JSON.parse(content);

        let resultElement = document.getElementById('result');

        // creating a mapping from titles to URLs
        let titleUrlMap = {};
        tabsData.forEach(tab => {
            titleUrlMap[tab.title] = tab.url;
        });

        // iterate through categories
        for (let category in categories) {
            let categoryElement = document.createElement('div');
            categoryElement.textContent = category;
            resultElement.appendChild(categoryElement);

            let itemsElement = document.createElement('ul');

            // iterate through items in each category
            categories[category].forEach(item => {
                let itemElement = document.createElement('li');
            
                // Check if the item's title has a corresponding URL in the map
                if (titleUrlMap[item]) {
                    let link = document.createElement('a');
                    link.href = titleUrlMap[item]; // use the map to get the URL
                    link.textContent = item;
                    
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        chrome.tabs.query({url: titleUrlMap[item]}, function(tabs) {
                            if (tabs.length) {
                                chrome.tabs.update(tabs[0].id, {active: true});
                            } else {
                                chrome.tabs.create({url: titleUrlMap[item]});
                            }
                        });
                    });

                    itemElement.appendChild(link);

                    // creating delete button
                    let deleteButton = document.createElement('button');
                    deleteButton.textContent = 'x';
                    deleteButton.dataset.index = tabsData.findIndex(tab => tab.title === item); // store the index
                    deleteButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        chrome.tabs.query({url: titleUrlMap[item]}, function(tabs) {
                            if (tabs.length) {
                                chrome.tabs.remove(tabs[0].id);
                            }
                        });
                        // remove item from popup
                        itemElement.remove();

                        // Find the index of the removed tab and remove it from tabsData
                        let index = tabsData.findIndex(tab => tab.title === item);
                        if (index !== -1) {
                            tabsData.splice(index, 1);
                        }

                        let contentObj = JSON.parse(data.choices[0].message.content);
                        for (let category in contentObj) {
                            let categoryIndex = contentObj[category].findIndex(i => i === item);
                            if (categoryIndex !== -1) {
                                contentObj[category].splice(categoryIndex, 1);
                                if (contentObj[category].length === 0) {
                                    delete contentObj[category];
                                    // If so, remove the category element
                                    categoryElement.remove();
                                }
                        
                                break;
                            }
                        }
                        data.choices[0].message.content = JSON.stringify(contentObj);

                        // Save the updated tabs and data to storage
                        chrome.storage.local.set({tabs: tabsData, data: data});

                        // check if all items have been removed
                        if (itemsElement.children.length === 0) {
                            // If so, remove the category element
                            categoryElement.remove();
                        }
                    });

itemElement.appendChild(deleteButton); // add the delete button to the item
                } else {
                    itemElement.textContent = item;
                }
            
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
        displayData(result.data, result.tabs);
    }
});

