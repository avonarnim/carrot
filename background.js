// gets the URL of current active tab
chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
    var url = tabs[0].url;
    console.log(url);
});

// function that stores the session info 
// takes  all the URLS of open tabs and store them in local storage as "session"
chrome.tabs.query({},function(tabs) {
    var urls = tabs.map(function(tab) {
        return tab.url;
    });

    // saving to local storage for now
    localStorage.setItem('session', JSON.stringify(urls));
});

// how to retrieve session info
var session = JSON.parse(localStorage,getItem('session'));
console.log(session);

