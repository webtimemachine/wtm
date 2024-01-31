const SERVER_URL = 'https://36ac-181-117-161-108.ngrok-free.app/'

console.log('Content.js loaded in', window.location.href)

// eslint-disable-next-line no-undef
chrome.storage.sync.get('deviceName', function (result) {
  console.log('deviceName in storage', result)
  fetch(SERVER_URL, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    }),
    body: JSON.stringify({
      url: window.location.href,
      title: document.title,
      deviceName: result.deviceName || 'Unknown'
    })
  })
})
