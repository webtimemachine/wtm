/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Login from './components/Login'
import MainApp from './MainApp'
import {EnvContextProvider} from './helpers/EnvContext';

import { inExtension } from "./helpers/Constants";

import AppRouter from './AppRouter';


const App = () => {

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.querySelector('html').classList.add('mobile')
  } else {
    document.querySelector('html').classList.add('desktop')
  }
  if (/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent)) {
    document.querySelector('html').classList.add('apple-device')
  }

  return (
    <EnvContextProvider>
      <AppRouter></AppRouter>
    </EnvContextProvider>
  )
}

export default App
