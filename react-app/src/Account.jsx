import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

import {
  DEFAULT_DEVICE_NAME,
  getFromStorage
} from './Constants'
import LogsMain from './LogsMain'

import {
  goTo
} from 'react-chrome-extension-router'

export default function Account({ session }) {

  const [, setDeviceName] = useState(DEFAULT_DEVICE_NAME)


  useEffect(() => {
    getFromStorage("deviceName").then((result) => {
      console.log("[Account.jsx] deviceName", result)
      if (result !== DEFAULT_DEVICE_NAME && result !== "" && result !== null && result !== undefined) {
        goTo(LogsMain, { message: 'Welcome to the extension' })
      } else {
        setDeviceName(result || DEFAULT_DEVICE_NAME)
      }
    })
  }, [])

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  const signOut = () => {
    supabase.auth.signOut({ scope: 'local' })
    console.log("Signout called")
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" type="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </form>
  )
}