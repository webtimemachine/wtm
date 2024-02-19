// import { useState } from 'react'
import { API_URL, inExtension } from './Constants';
import { supabase } from './supabaseClient'
// import {
//     Link
// } from 'react-chrome-extension-router'
// import Account from './Account'


export default function Auth() {
    // const [loading, setLoading] = useState(false)
    // const [email, setEmail] = useState('')

    // const handleLogin = async (event) => {
    //     event.preventDefault()

    //     setLoading(true)
    //     const { error } = await supabase.auth.signInWithOtp({ email })

    //     if (error) {
    //         alert(error.error_description || error.message)
    //     } else {
    //         alert('Check your email for the login link!')
    //     }
    //     setLoading(false)
    // }
    const handleProviderLogin = async (event, provider = "github") => {

        // eslint-disable-next-line no-undef
        if (!inExtension) {
            await supabase.auth.signInWithOAuth({
                provider: provider,
                "options": {
                    "redirect_to": API_URL + "/static/login.html"
                }
            });
        }
    }
    
    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header">Log in your account to mantain synced your different devices browsing history</h1>
                <br></br>
                {/* eslint-disable-next-line no-undef */}
                {!inExtension ? <button onClick={handleProviderLogin}>Sign in with Github</button> : <a target='_BLANK' href={API_URL + "/static/login.html"} rel="noreferrer">Sign in with Github</a>}
                {/* <p className="description">Sign in via magic link with your email below</p>
                <form className="form-widget" onSubmit={handleLogin}>
                    <div>
                        <input
                            className="inputField"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className={'button block'} disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Send magic link</span>}
                        </button>
                    </div>
                </form> */}
            </div>
        </div>
    )
}