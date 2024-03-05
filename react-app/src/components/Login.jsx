import { useContext } from 'react'
import { inExtension } from '../helpers/Constants';
import { EnvContext } from '../helpers/EnvContext'

export default function Auth() {
    const [ENVCONTEXT,] = useContext(EnvContext)
    const handleProviderLogin = async (event, provider = "github") => {

        // eslint-disable-next-line no-undef
        if (!inExtension) {
            await ENVCONTEXT.supabase.auth.signInWithOAuth({
                provider: provider,
                "options": {
                    "redirect_to": ENVCONTEXT.API_URL + "/login?provider=" + provider
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
                {!inExtension ? <button onClick={handleProviderLogin}>Sign in with Github</button> : <a target='_BLANK' href={ENVCONTEXT.API_URL + "/login?provider=github"} rel="noreferrer">Sign in with Github</a>}
            </div>
        </div>
    )
}