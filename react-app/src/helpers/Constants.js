export const DEFAULT_DEVICE_NAME = 'My device'

export const API_URL = process.env.REACT_APP_API_URL;

export async function getFromStorage(payload) {
    // console.log('getFromStorage', payload, inExtension);
    // eslint-disable-next-line no-undef
    if (inExtension) {
        // eslint-disable-next-line no-undef
        const data = (await chrome.storage.sync.get(payload))[payload]
        // eslint-disable-next-line no-undef
        // console.log('getFromStorageChrome', payload, await chrome.storage.sync.get(payload));
        return data
    } else {
        try {
            return JSON.parse(localStorage.getItem(payload));
        } catch (error) {
            return localStorage.getItem(payload);
        }
    }
}
export async function setInStorage(key, payload) {
    // console.log('setInStorage', key, payload, inExtension);
    // eslint-disable-next-line no-undef
    if (inExtension) {
        const toPost = { [key]: payload }
        // console.log('setInStorageChrome', payload);
        // eslint-disable-next-line no-undef
        await chrome.storage.sync.set(toPost)
    } else {
        try {
            localStorage.setItem(key, JSON.stringify(payload));
        } catch (error) {
            localStorage.setItem(key, payload);
        }
    }
}

export async function deleteFromStorage(key) {
    // console.log('deleteFromStorage', key, inExtension);
    // eslint-disable-next-line no-undef
    if (inExtension) {
        // console.log('deleteFromStorageChrome', key);
        // eslint-disable-next-line no-undef
        await chrome.storage.sync.remove(key)
    } else {
        localStorage.removeItem(key);
    }
}

// eslint-disable-next-line no-undef
export const inExtension = (typeof chrome != "undefined" && typeof chrome.storage != "undefined");

export async function getSetup(serverUrl = API_URL) {
    const res = await fetch(serverUrl + "/setup", {
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420"
        })
    })
    if (res.status === 200) {
        const data = await res.json()
        if (data.version) {
            return data
        }
    }
}