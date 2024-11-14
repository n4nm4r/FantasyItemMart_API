import { useState } from 'react'
import { useCookies} from 'react/cookie';

import './App.css'

function App() {
  const [cookies, setCookie, removeCookie]= useCookies(['item'])


  return (
    <>
      
      <h1>PAGE !</h1>
      
    </>
  )
}

export default App
