import { setInStorage, getFromStorage,deleteFromStorage } from '../src/helpers/Constants';

import { createClient } from "@supabase/supabase-js";

// chrome.storage.onChanged.addListener((changes, namespace) => {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// }
// );

async function loadSupabase(){
  const API_URL = await getFromStorage("API_URL")
  const SUPABASE_URL = await getFromStorage("SUPABASE_URL")
  const SUPABASE_ANON_KEY = await getFromStorage("SUPABASE_ANON_KEY")
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        detectSessionInUrl: true,
        persistSession : true,
        storage: {
            getItem: (key) => {
                return getFromStorage(key);
            },
            setItem: (key, data) => {
                setInStorage(key, data);
            },
            removeItem: (key) => {
                deleteFromStorage(key);
            }
        }
    },
  });
  return {
    API_URL,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    supabase
  }
}

const {API_URL, supabase} = await loadSupabase()

async function postData(data) {
  let deviceName = await getFromStorage('deviceName')
  // console.log('[Normal use] get session', deviceName, data)
  if (data) {
    fetch(API_URL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        'Authorization': data.access_token,
        'refresh-token': data.refresh_token
      }),
      body: JSON.stringify({
        url: window.location.href,
        title: document.title,
        deviceName: deviceName
      })
    })    
  }
}

let processing = false;

var urlData = {};
if (window.location.hash) {
  window.location.hash.substring(1).split("&").forEach((a) => {
    let [key, value] = a.split("=");
    urlData[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  if (urlData.access_token && urlData.refresh_token) {
    processing = true;
    let loadedSession = await supabase.auth.setSession(urlData)
    // console.log("[CONTENT] set session:", loadedSession);
    if (loadedSession.error) {
      // console.log("[CONTENT] error:", loadedSession.error);
    } else {
      postData(loadedSession.data.session);      
    }
  }
}

if (!processing) {
  const data = await refreshAuth()
  postData(data)
}

async function refreshAuth() {
  const { data, error } = await supabase.auth.refreshSession();
  return data.session
}
