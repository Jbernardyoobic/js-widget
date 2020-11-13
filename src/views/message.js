import html from './message.html';
import './message.css';

let elements = [];
let body;

export function show() {
    // convert plain HTML string into DOM elements
    let temporary = document.createElement('div');
    temporary.innerHTML = html;
    temporary.getElementsByClassName('widget')[0].addEventListener('click', call);

    // append elements to body
    body = document.getElementsByTagName('body')[0];
    while (temporary.children.length > 0) {
        elements.push(temporary.children[0]);
        body.appendChild(temporary.children[0]);
    }
}

export function call() {
    const xhr = new XMLHttpRequest();
    const locationRef = "5eb06b410ed691003b6c35a7";
    const callType = "videocall";
    const partySize = 1;
    const data = {
        locationRef,
        visit: {
            callType,
            partySize,
            email: "emontredon1111112@yoobic.com",
            name: "Emilie1111111"
        }
    };
    xhr.open("POST", "https://yoobic-loopback-dev-v3.herokuapp.com/api/waitlistYoobicVisits/createVisit", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const visit = JSON.parse(xhr.responseText);
            open(`https://operations.yoobic.com/#/missionviewer?mode=waitlist&env=dev&external=true&id=5eb06b410ed691003b6c35a7&visitId=${visit._id}`, '_blank');
        }
    };
}