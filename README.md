# carrot

carrot-chrome-extension

Carrot's the very first app I've ever coded from scratch!

It takes your currently opened tabs and organizes them into groups in our chrome extension popup.

Top problems:

1. The time it takes to organize tabs is roughly 8~ seconds which is WAY too long.

- potential improvement #1: could display streamed results instead of waiting for the full result to be written + returned... seemes like it mainly just requires setting the stream=true param in the initial configuration --> as you receive the response, create new divs/lists & progressively add the surrounding buttons/icons
- potential improvement #2: could pivot from using openai
  - (a) run each tab title through a filter that extracts only keywords/non-proper nouns --> send through k-means clustering alg to separate the tabs into groups

2. The design needs ALOT of work so would appreciate tips on frameworks or how to design chrome extensions well.

How to test the extension locally:

1. Run the following command to clone the repository:

git clone https://github.com/stevetng/carrot.git

Make sure to install the following packages:

- cors, express, dotenv, openai

2. Access Chrome Extensions Settings
   Open your Google Chrome browser and click on the three vertical dots in the top-right corner to access the Chrome menu. From the menu, select “Settings.”

3. Navigate to Extensions
   In the Chrome settings, scroll down and click on the “Extensions” option located in the left-hand sidebar. Alternatively, you can directly enter the following URL in the address bar: chrome://extensions/

4. Enable Developer Mode
   Once you are on the Extensions page, toggle on the “Developer mode” switch located in the top-right corner. This will enable advanced options for testing and loading unpacked extensions.

5. Load the Unpacked Extension
   After enabling Developer mode, three new buttons will appear at the top of the Extensions page. Click on the “LOAD UNPACKED” button.

6. Select the Unzipped Extension Folder
   A file browser window will open. Navigate to the unzipped build folder of the extension that you downloaded in Step 1. Select the folder and click “OK” or “Open” to proceed.

7. Verify Successful Upload
   Once the folder is selected, Chrome will load the extension, and you will see it listed among your installed extensions. Look for the icon of the extension, usually displayed as a puzzle piece, in the Chrome toolbar.

8. Add your OpenAI API key to a .env file and call it OPENAI_API_KEY to use the organize tabs functionality

9. Pin the Extension (Optional)
   To easily access the extension while testing, you can pin it to the Chrome toolbar. Right-click on the extension’s icon and select the “Pin” option from the context menu. This will keep the extension icon visible even when you close and reopen Chrome.
