import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PlantGallery from './dev/PlantGallery.jsx'
import './index.css'

// Add ?gallery to the URL to see every plant at every stage
const showGallery = new URLSearchParams(window.location.search).has('gallery')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {showGallery ? <PlantGallery /> : <App />}
  </React.StrictMode>,
)
