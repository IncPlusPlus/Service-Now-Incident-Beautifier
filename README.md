## This readme file is a work in progress. More info will be added in the near future
# Service Now Incident Beautifier
This is a little userscript I made to remove extraneous details from the Incident Information tab of incident pages. Scroll down for installation and usage instructions. This script detects and removes extra information from comments on tickets that include previous email replies. Instead of having to scroll back and forth to look at different messages in a ticket, this script collapses the extra replies and replaces them with a button to show them again.
[SCREENSHOTS OF THIS IN ACTION WILL BE POSTED AS SOON AS THEY ARE APPROVED]
## Concerned with what this software could possibly do to your computer?
As long as you follow the installation instructions, I can guarantee that no harm will come to your computer or your person. I wrote the script that you will install myself. There is no unknown or foreign code that will run in the background. Additionally, my script won't be running all the time. In fact, it only runs when you are specifically viewing an incident page in ServiceNow.
### What the heck is Tampermonkey/Greasemonkey?! That doesn't sound trustworthy!
No worries, I want to be as transparent with my work as possible. I'll explain the gist of it. Tampermonkey (known as Greasemonkey on Firefox) is an extension/addon for your browser that allows you to run custom scripts to change the way certain web pages work. Don't worry, web pages you visit won't be affected unless you have a script installed that acts on some particular web page(s). Most scripts (known also as userscripts) for Tampermonkey/Greasemonkey are quality of life improvements to various web sites to make using them easier and more convenient. The userscript that I have written was created with this intent as well.
### Okay... What is this "script" and what does it do?
The script that I mention several times above and below is a chunk of JavaScript code written by myself. It is written with the goal of hiding previous replies to emails inside of the "Incident Information" tab of incident pages in ServiceNow. For some reason ServiceNow doesn't do this on its own and it's a huge pain to sift through irrelevant garbage text to get one piece of information from a conversation.

## How to install
It should be noted that while this script is theoretically usable with Firefox, it has not been tested. Therefore, stability and support cannot be guaranteed to Firefox users.

### For Chrome Users
Step 1) [Install Tampermonkey from the chrome web store](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)  
Step 2) [Click this link to install my script](../../raw/master/Incident%20Info%20Beautifier.user.js)  
Step 3) Go to an incident page in ServiceNow 
Step 4) Locate the Tampermonkey extension's icon and click it  
![Step4Image](Instructions%20Images%20Folder/Step%204.png)
Step 5) Click the switch to the left of the words "Incident Info Beautifier" so that it turns green like in the picture  
![Step5Image](Instructions%20Images%20Folder/Step%205.png)
Step 6) Go to an incident page that had a lot of extra replies and useless info in it and see if they've been hidden and replaced with a button.  
That's it! You're done!

## Usage instructions
### Coming soon!
