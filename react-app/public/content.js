import { setInStorage, getFromStorage,deleteFromStorage } from '../src/helpers/Constants';

import { createClient } from "@supabase/supabase-js";

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
    if (!loadedSession.error) {
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
