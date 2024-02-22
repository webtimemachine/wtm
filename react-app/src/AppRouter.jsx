
import {
  Router
} from 'react-chrome-extension-router'
import { useContext } from 'react'
import { EnvContext } from './helpers/EnvContext'
import Login from './components/Login'
import MainApp from './MainApp'

export default function AppRouter() {
  const [ENVCONTEXT,] = useContext(EnvContext)
  console.log('AppRouter', ENVCONTEXT)
  return <Router>
    <div className="p-4 mx-auto bg-white rounded-xl shadow-md">
      {!ENVCONTEXT || !ENVCONTEXT.supabase ? <h1 className="text-2xl font-semibold text-gray-900">Loading enviroment setup</h1> : <>
        {ENVCONTEXT.session ? <MainApp /> : <Login></Login>}
      </>}

      {/* {session ? (inExtension ? <LogsMain /> : <h1>Please follow on the extension</h1>) : <Login message='Welcome to the extension' />} */}
    </div>
  </Router>;
}

