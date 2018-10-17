// ==UserScript==
// @name         Incident Info Beautifier
// @namespace    ryanclohertytweaks
// @version      0.1.3
// @description  Attempts to remove replies from the Incident Information tab
// @author       Ryan Cloherty
// @match        *://wit.service-now.com/incident.do*
// @updateURL	https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier/raw/master/Incident%20Info%20Beautifier.user.js
// @downloadURL	https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier/raw/master/Incident%20Info%20Beautifier.user.js
// @homepageURL	https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier
// @supportURL	https://github.com/IncPlusPlus/Service-Now-Incident-Beautifier/issues
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("HELLO WORLD, AAAAAAAAAAA");
    var tab_headers = document.getElementById("element.incident.comments_and_work_notes.additional");
    console.log(tab_headers.children[0].children[0].children);
    var divContainngMessageDivs = tab_headers.children[0].children[0].children;
    console.log(divContainngMessageDivs.length);
    console.log(divContainngMessageDivs.item(0));
    console.log(divContainngMessageDivs.item(0).innerHTML === "<span></span><hr>");
    console.log(divContainngMessageDivs.item(0).innerHTML);

    var thinLineCount = 0;
    for(var i = 0; i < divContainngMessageDivs.length; i++)
    {
        if(divContainngMessageDivs.item(i).innerHTML === "<span></span><hr>")
        {
            thinLineCount++;
        }
    }
    console.log(thinLineCount);

    var re = /((\d{1,2}\/)(\d{1,2}\/)(\d+) (\d{2}:)(\d{2}:)(\d{2}) (AM|PM) (EDT) - .*? Additional comments)/;

    var commentBodies = [];
    for(var j = 2; j < divContainngMessageDivs.length; j+=3)
    {
        commentBodies.push(divContainngMessageDivs.item(j));
    }
    console.log(commentBodies);

    var commentsWithNoReplies = [];
    for(var l = 0; l < commentBodies.length; l++)
    {
        commentsWithNoReplies.push(commentBodies[l].children[0].children[0].innerHTML.split(re)[0]);
    }
    console.log(commentsWithNoReplies);

    var correspondingNoReplyComment = 0;
    var hasSomethingBeenReplaced = "";
    console.log(commentBodies[1].children[0].children[0].innerHTML);
    console.log(commentsWithNoReplies[1]);
    for(var m = 2; m < divContainngMessageDivs.length; m+=3)
    {
        if(commentBodies[correspondingNoReplyComment].children[0].children[0].innerHTML === commentsWithNoReplies[correspondingNoReplyComment])
        {
            hasSomethingBeenReplaced = ""
        }
        else
        {
            hasSomethingBeenReplaced = "MESSAGE HAS BEEN TRUNCATED"
        }
        document.getElementById("element.incident.comments_and_work_notes.additional").children[0].children[0].children[m].innerHTML = commentsWithNoReplies[correspondingNoReplyComment] + hasSomethingBeenReplaced;
        correspondingNoReplyComment++;
    }
})();