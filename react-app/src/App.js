/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {
  Router
} from 'react-chrome-extension-router'

import Login from './Login'
import Account from './Account'
import { supabase } from './supabaseClient'
import LogsMain from './LogsMain'

import { inExtension } from "./Constants";


const App = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {

    console.log("[App.js] Init", window.location.hash);

    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   console.log('[App.js] Get session', session, session === null)
    //   if (session !== null) {
    //     setSession(session)        
    //   }
    // })

    supabase.auth.onAuthStateChange((event, session) => {
      console.log('[App.js] Auth state change', event, session, session !== null)
      if (session !== null) {
        setSession(session)
      } else {
        supabase.auth.refreshSession().then(console.log)
      }
    })

  }, [])

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.querySelector('html').classList.add('mobile')
  } else {
    document.querySelector('html').classList.add('desktop')
  }
  if (/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent)) {
    document.querySelector('html').classList.add('apple-device')
  }

  return (
    <Router>
      <div className="p-4 mx-auto bg-white rounded-xl shadow-md">
        {session ? (inExtension ? <LogsMain /> : <h1>Please follow on the extension</h1>) : <Login message='Welcome to the extension' />}
      </div>
    </Router>
  )
}

export default App
