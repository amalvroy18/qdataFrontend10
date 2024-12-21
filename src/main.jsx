import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import Contextshare from './context/Contextshare.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
    <Contextshare>
      <App />
    </Contextshare>
   </BrowserRouter>
  </React.StrictMode>,
)
