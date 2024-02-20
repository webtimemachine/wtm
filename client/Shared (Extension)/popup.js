/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Script that runs after clicking the extension's toolbar button.
*/

const PAGESIZE = 50

document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 0;

    async function fetchUrls() {

        
        document.getElementById('title').textContent = "Loading..."
        const response = await fetch(`https://97fd-181-117-161-108.ngrok-free.app/logs?offset=${currentPage * PAGESIZE}`, {
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            }),
        });
        document.getElementById('title').textContent = "List of browser history"
        const data = await response.json();
        const logs = data.urls;
        const count = data.count;
        const urlList = document.getElementById('url-list');
        urlList.innerHTML = '';
        logs.forEach(log => {
            const urlDiv = document.createElement('div');
            const urlAnchor = document.createElement('a');
            urlAnchor.textContent = log.url;
            urlAnchor.href = log.url;
            urlAnchor.target = "_BLANK"
            const urlTime = document.createElement('span');
            const timeAgo = moment.utc(log.createdAt).fromNow();
            console.log(timeAgo);
            urlTime.textContent = timeAgo;

            let foundBrowser = undefined;

            switch (log.browserName) {
                case 'Chrome':
                    foundBrowser = 'fa-chrome';
                    break;
                case 'Firefox':
                    foundBrowser = 'fa-firefox';
                    break;
                case 'Safari':
                case 'Mobile Safari':
                    foundBrowser = 'fa-safari';
                    break;
                case 'Edge':
                    foundBrowser = 'fa-edge';
                    break;
                case 'Opera':
                    foundBrowser = 'fa-opera';
                    break;
                case 'IE':
                    foundBrowser = 'fa-internet-explorer';
                    break;
                default:
                    break;
            }


            const iconsDiv = document.createElement('div');            

            if (foundBrowser) {
                const icon = document.createElement('i');
                icon.classList.add('icons', 'fa-brands', foundBrowser);
                iconsDiv.append(icon)                
            }


            let foundDevice = undefined;

            switch (log.osName) {
                case 'Mac OS X':
                    foundDevice = 'laptop_mac';
                    break;
                case 'iOS':
                    foundDevice = 'smartphone';
                    break;
                default:
                    foundDevice = 'device_unknown';
                    break;
            }

            if (foundDevice) {
                const icon = document.createElement('i');
                icon.classList.add('material-symbols-outlined', foundDevice);
                icon.innerHTML = foundDevice
                iconsDiv.append(icon)                
            }
            if (foundDevice || foundBrowser) {
                urlDiv.append(iconsDiv)
            }    
            urlDiv.append(urlAnchor)
            urlDiv.append(urlTime);
            urlList.appendChild(urlDiv);
            urlList.appendChild(document.createElement('br'));
        });
        document.querySelectorAll("button").forEach(button => button.disabled = false);
        document.getElementById('prev-page').disabled = currentPage === 0;
        document.getElementById('next-page').disabled = currentPage * PAGESIZE + logs.length >= count;
    }

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            document.querySelectorAll("button").forEach(button => button.disabled = true);
            fetchUrls();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        document.querySelectorAll("button").forEach(button => button.disabled = true);
        fetchUrls();
    });

    fetchUrls();
});
