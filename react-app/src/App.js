import LogsMain from './LogsMain'

import { useEffect, useState } from 'react'
import {
  goTo,
  Link,
  Router
} from 'react-chrome-extension-router'

import {
  DEFAULT_DEVICE_NAME
} from './Constants'
const LinkToHistory = () => {
  return (
    <p className='text-center'>
      <Link component={LogsMain} props={{ message: '' }}>
        Go to history
      </Link>
    </p>
  )
}


const App = () => {
  const [deviceName, setDeviceName] = useState(DEFAULT_DEVICE_NAME)

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log('Saving deviceName', deviceName)
      // eslint-disable-next-line no-undef
      if (chrome.storage) {
        // eslint-disable-next-line no-undef
        chrome.storage.sync.set({ deviceName }, () => {
          console.log('Just saved deviceName', deviceName)
        })
      } else {
        console.log('No chrome.storage, using locastorage')
        localStorage.setItem('deviceName', deviceName)
      }
    }, 1000) //this is because chrome.storage.sync.set has a limit

    return () => clearTimeout(timerId) // clear the timeout just in case
  }, [deviceName])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (chrome.storage) {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.get('deviceName').then(function (result) {
        console.log('deviceName in storage', result.deviceName)
        if (deviceName !== result.deviceName) {
          if (result.deviceName !== DEFAULT_DEVICE_NAME) {
            goTo(LogsMain, { message: 'Welcome to the extension' })
          }
          setDeviceName(result.deviceName || DEFAULT_DEVICE_NAME)
        }
      })
    } else {
      const deviceName = localStorage.getItem('deviceName')
      console.log('No chrome.storage, using locastorage', deviceName)
      if (deviceName !== DEFAULT_DEVICE_NAME) {
        goTo(LogsMain, { message: 'Welcome to the extension' })
      }
      setDeviceName(deviceName || DEFAULT_DEVICE_NAME)
    }
  }, [])

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.querySelector('html').classList.add('mobile')
  } else {
    document.querySelector('html').classList.add('desktop')
  }
  if (/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent)) {
    document.querySelector('html').classList.add('apple-device')
  }
  useEffect(() => {
    // const { component, props } = getCurrent();
    // console.log(
    //   component
    //     ? `There is a component on the stack! ${component} with ${props}`
    //     : `The current stack is empty so Router's direct children will be rendered`
    // );
    // const components = getComponentStack();
    // console.log(`The stack has ${components.length} components on the stack`);
  })

  const deviceNameKeyPress = (e) => {
    if (e === "Enter") {
      goTo(LogsMain, { message: 'Welcome to the extension' })
    }
  }

  return (
    <Router>
      <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md">
        <h1 className="text-xl font-semibold">Hello, now we are using Tailwind!</h1>
        <p className="mt-2 text-gray-600">Tailwind is applied.</p>
        <br></br>
        <br></br>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Set this device name</label>
          <div className="mt-2">
            <input id="email" name="email" value={deviceName} onKeyDown={(e) => deviceNameKeyPress(e.key)} onChange={(e) => setDeviceName(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
          </div>
        </div>
        <LinkToHistory />
      </div>
    </Router>
  )
}

export default App
