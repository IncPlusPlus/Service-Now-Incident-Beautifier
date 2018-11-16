// ==UserScript==
// @name         Incident Info Beautifier
// @namespace    ryanclohertytweaks
// @version      1.0.2-unstable
// @description  Attempts to remove replies from the Incident Information tab
// @author       Ryan Cloherty
// @match        *://wit.service-now.com/incident.do*
// @updateURL	 https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier/raw/master/Incident%20Info%20Beautifier.user.js
// @downloadURL	 https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier/raw/master/Incident%20Info%20Beautifier.user.js
// @homepageURL	 https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier
// @supportURL	 https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier/issues
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //I'm leaving this here as an indication in console that the script has started
    console.log("HELLO WORLD! AAAAAAAAAAA!!!!");
    //Grab the <div> element that contains all of the incident comments and work notes (whcih are a few element layers down)
    var incidentComments = document.getElementById("element.incident.comments_and_work_notes.additional");
    //Log the HTMLCollection of <div> tags (1/3 of which are the actual comments) to the console for troubleshooting
    //console.log(incidentComments.children[0].children[0].children);
    //Store the HTMLCollection of <div> tags. These tags are actually a few element layers down. They're the children within the first child element within the first child element of incidentComments
    var divContainingMessageDivs = incidentComments.children[0].children[0].children;
    //Log the total number of div tags in the HTMLCollection just to be extra sure the script read what it was supposed to
    //console.log(divContainingMessageDivs.length);
    //This should spit out the latest comment in the issue in the form of a <div> element in your browser's console
    //console.log(divContainingMessageDivs.item(2));
    //Beginning at the first <div> tag (item(0)), every 3rd <div> tag (item(3), item(6), ...) is used to make a thin divider line on the page. This should spit out true in the console
    //console.log(divContainingMessageDivs.item(0).innerHTML === "<span></span><hr>");
    //This should spit out the raw HTML of the first <div> tag representing the latest comment in the issue in your browser's console
    //console.log(divContainingMessageDivs.item(2).innerHTML);

    /*
    This section was created just to do some sanity checking in the early stages of this script.
    I'll keep it here in case somebody is maintaining this code down the line and wants to use this.
    */
    // var thinLineCount = 0;
    // for(var i = 0; i < divContainingMessageDivs.length; i++)
    // {
        // if(divContainingMessageDivs.item(i).innerHTML === "<span></span><hr>")
        // {
            // thinLineCount++;
        // }
    // }
    // console.log(thinLineCount);
    /*

    What follows is a regular expression which is the key for making this script work.
    I'll do a little explaining but I'd recommend just slapping it into https://regexr.com/ or https://regex101.com/
    Those tools do a great job at explaining just what a particular regular expression is doing (or not doing).
    --
    Alltogether, this regular expression should highlight the text that almost always denotes the beginning of a series of previous replies sent by the commenter's email client.
    A brief explaination of how this works is written below.
    --
    The first three groups in parenthesis check for a date by checking if there are as follows: one to two numbers, followed by a slash, followed by one to two numbers,
    followed by a slash, followed by 1 or more numbers (that last bit is the year which is usually XXXX)
    --
    The second three groups in parenthesis check for a time by checking if there are three groups of two digit numbers.
    These numbers must be separated by colons. This time is then followed by a space and then either AM or PM.
    There is also a timezone indicator and the person who commented's name (which could be anything so a wildcard .* was used and restricted by ?)
    The last bit that follows is a section that checks for the words Additional comments.
    --
    */
    var re = /((\d{1,2}\/)(\d{1,2}\/)(\d+) (\d{2}:)(\d{2}:)(\d{2}) (AM|PM) .*? Additional comments)/;

    //Grabs each <div> which contains a comment. The comments are the 3rd <div> tag (index 2) and each one is 3 <div> tags down from the previous one
    var commentBodies = [];
    for(var j = 2; j < divContainingMessageDivs.length; j+=3)
    {
        commentBodies.push(divContainingMessageDivs.item(j));
    }
    //console.log(commentBodies);

    /*
    Grabs the innerHTML of the messages themselves and breaks each into an array at each point that the regular expression re is satisfied
    After this, it adds the first entry of this array to commentsWithNoReplies.
    The first entry of each array will always have the text just before the extra replies that will be removed
    */
    var commentsWithNoReplies = [];
    for(var l = 0; l < commentBodies.length; l++)
    {
        commentsWithNoReplies.push(commentBodies[l].children[0].children[0].innerHTML.split(re)[0]);
    }
    //console.log(commentsWithNoReplies);

    //Each entry contains the innerHTML of the text that contained replies that got cut out
    var truncatedText = [];
    for(var it = 0; it < commentBodies.length; it++)
    {
        //Grab the whole comment body starting from the bit that's we should already have
        truncatedText.push(commentBodies[it].children[0].children[0].innerHTML.substring(commentsWithNoReplies[it].length));
    }

    //This variable just keeps track of the comment that's being examined within the code block below
    var correspondingNoReplyComment = 0;
    var hasSomethingBeenReplaced = "";
    console.log("And here we are");
    //Prints out the second latest reply with all the extra replies and that garbage. Useful for troubleshooting
    //console.log(commentBodies[0].children[0].children[0].innerHTML);
    //Prints out the second latest reply without all the extra replies and that garbage. Useful for toubleshooting
    //console.log(commentsWithNoReplies[0]);
    //Loop through each <div> tag that contains a comment
    for(var m = 2; m < divContainingMessageDivs.length; m+=3)
    {
        /*
        This checks whether the comment has been truncated.
        If it hasn't been truncated, the string will remain empty.
        If there has been some sort of change, the string will be filled with a specific message whcih will be added to the web page to indicate that the specific comment in question has been truncated.
        This message also contains HTML that will be added to the web page. This HTML creates a button that acts as a toggle to show and hide the truncated content.
        */
        if(commentBodies[correspondingNoReplyComment].children[0].children[0].innerHTML === commentsWithNoReplies[correspondingNoReplyComment])
        {
            hasSomethingBeenReplaced = ""
        }
        else
        {
            hasSomethingBeenReplaced = "MESSAGE REPLIES HAVE BEEN TRUNCATED<br><button type='button' value='HIDDEN' id='showTruncatedMessage_" + correspondingNoReplyComment + "'>Reveal truncated content</button>";
        }
        document.getElementById("element.incident.comments_and_work_notes.additional").children[0].children[0].children[m].innerHTML = commentsWithNoReplies[correspondingNoReplyComment] + hasSomethingBeenReplaced;
        /*
        This bit check to see if hasSomethingBeenReplaced isn't blank.
        If it isn't blank, then we know a button must have been created with the idea showTruncatedMessage_ followed by the number held in correspondingNoReplyComment.
        We then add an EventListener to the button to run the reveal function when it is clicked.
        */
        if(!(hasSomethingBeenReplaced === ""))
        {
            document.getElementById ("showTruncatedMessage_" + correspondingNoReplyComment).addEventListener ("click", function() {reveal(this.id);}, false);
        }
        correspondingNoReplyComment++;
    }



    /*
    Toggles the display of truncated text
    */
    function reveal(theButtonId)
    {
        //Spit out what button was clicked into the console. Useful for checking if the EventListener is working
        console.log(theButtonId + " clicked");
        //console.log("Printing parent innerHTML");
        //console.log(document.getElementById(theButtonId).parentElement.innerHTML);
        /*
        The best way I found of replacing a section of the plaintext and not breaking everything is a little jank.
        Please bear with me.
        Whenever a part of the comment's text is edited, the <button> element inside of that text loses its assigned EventListener
        I don't know whether these stick around after they're dissasociated from an object.
        I figured that since I have to assign a new one after each edit made to the page, I might as well remove the current EventListener
        */
        document.getElementById(theButtonId).removeEventListener("click", function() {reveal(this.id);}, false);
        //Spits out whether the button that was clicked to run this function is hiding text (value=="HIDDEN") or showing text (value=="SHOWN")
        console.log(theButtonId + " value was " + document.getElementById(theButtonId).value);
        //If the truncated text associated with this button is hidden...
        if(document.getElementById(theButtonId).value=="HIDDEN")
        {
            //Add the truncated text to this comment from truncatedText[]. The 21st character onward of theButtonId is the associated comment number
            document.getElementById(theButtonId).parentElement.innerHTML += "<br>" + truncatedText[theButtonId.substring(21)];
            document.getElementById(theButtonId).value="SHOWN";
            document.getElementById(theButtonId).textContent = "Showing truncated content";
            //Add the EventListener to the button again
            document.getElementById(theButtonId).addEventListener("click", function() {reveal(this.id);}, false);
        }
        else if(document.getElementById(theButtonId).value=="SHOWN")
        {
            /*
            If there's a better way of organizing this, please for the love of everything make a pull request.
            Here's what the next line does
            It changes the comment text to only be the beginning of the comment up to the last bit of the button.
            The bit at the end with adding 23 and then the length of the digits at the end of theButtonId is to accomodate for the fact that indexOf returns the index of the first letter of the found string.
            The numbers just push off that index a bit to make sure that the button is initialized and not cut off.
            */
            document.getElementById(theButtonId).parentElement.innerHTML = document.getElementById(theButtonId).parentElement.innerHTML.substring(0, document.getElementById(theButtonId).parentElement.innerHTML.indexOf(theButtonId + "\">Showing truncated content</button>")+23+theButtonId.substring(21).length);
            document.getElementById(theButtonId).value="HIDDEN";
            document.getElementById(theButtonId).textContent = "Reveal truncated content";
            //Add the EventListener to the button again
            document.getElementById(theButtonId).addEventListener("click", function() {reveal(this.id);}, false);
        }
        //Spits out whether the button that was clicked to run this function is now hiding text (value=="HIDDEN") or showing text (value=="SHOWN")
        console.log(theButtonId + "'s new value is " + document.getElementById(theButtonId).value);
    }


})();