import React, { createContext, useState, useEffect } from 'react';
import { getSetup, setInStorage, getFromStorage, deleteFromStorage, API_URL, DEFAULT_DEVICE_NAME } from './Constants';

import { createClient } from "@supabase/supabase-js";

export const EnvContext = createContext();


export const EnvContextProvider = ({ children }) => {
  function SetSupabaseInstance() {
    console.log('SetSupabaseInstance', providerState.SUPABASE_URL, providerState.SUPABASE_ANON_KEY);
    if (!providerState.SUPABASE_URL || !providerState.SUPABASE_ANON_KEY) {
      return
    }
    if (providerState.supabase) {
      providerState.supabase.auth.signOut("local");
    }
    setSupabase(createClient(providerState.SUPABASE_URL, providerState.SUPABASE_ANON_KEY, {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
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
      }
    }));
    setProviderState({...providerState, supabase: supabase})
  }

  const [session, setSession] = useState(null);
  const [supabase, setSupabase] = useState(null);
  const [providerState, setProviderState] = useState({
    supabase: supabase,
    session: session,
    deviceName: DEFAULT_DEVICE_NAME,
  });
  useEffect(() => {
    const cargarEstadoInicial = async () => {
      const local_API_URL = (await getFromStorage('API_URL')) || API_URL;
      let local_SUPABASE_URL = (await getFromStorage('SUPABASE_URL'));
      let local_SUPABASE_ANON_KEY = (await getFromStorage('SUPABASE_ANON_KEY'))
      const deviceName = (await getFromStorage('deviceName')) || DEFAULT_DEVICE_NAME;
      if (!local_SUPABASE_URL || !local_SUPABASE_ANON_KEY) {
        const data = await getSetup(local_API_URL)
        console.log("SETUP:", data)
        local_SUPABASE_URL = data.supabaseUrl;
        local_SUPABASE_ANON_KEY = data.supabaseAnonKey;
      }
      setProviderState({ ...providerState, API_URL: local_API_URL, SUPABASE_URL: local_SUPABASE_URL, SUPABASE_ANON_KEY: local_SUPABASE_ANON_KEY, supabase, session, deviceName });
      SetSupabaseInstance();
    };

    cargarEstadoInicial();
  }, []);
  useEffect(() => {
    if (providerState.SUPABASE_URL && providerState.SUPABASE_ANON_KEY) {
      SetSupabaseInstance();
    }
  }, [providerState.SUPABASE_URL, providerState.SUPABASE_ANON_KEY]);
  useEffect(() => {
    setProviderState({ ...providerState, supabase });
    if (supabase !== null) {
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth event', event, session);
        if (event === 'SIGNED_IN') {
          setSession(session);
          setProviderState({ ...providerState, session, supabase });
        }
        if (event === 'SIGNED_OUT') {
          setSession(null);
        }
      });

    }
  }, [supabase])

  useEffect(() => {
    setProviderState({ ...providerState, session: session });
  }, [session]);

  useEffect(() => {
    async function save() {
      if (providerState.API_URL) {
        await setInStorage('API_URL', providerState.API_URL);
      }
      if (providerState.SUPABASE_URL) {
        await setInStorage('SUPABASE_URL', providerState.SUPABASE_URL);
      }
      if (providerState.SUPABASE_ANON_KEY) {
        await setInStorage('SUPABASE_ANON_KEY', providerState.SUPABASE_ANON_KEY);
      }
      if (providerState.deviceName !== DEFAULT_DEVICE_NAME) {
        await setInStorage('deviceName', providerState.deviceName);
      }
    }
    save();
  }, [providerState]);

  return (
    <EnvContext.Provider value={[providerState, setProviderState]}>
      {children}
    </EnvContext.Provider>
  );
};
