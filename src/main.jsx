import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PlantGallery from './dev/PlantGallery.jsx'
import FurnitureGallery from './dev/FurnitureGallery.jsx'
import './index.css'

// Add ?gallery to the URL to see every plant at every stage,
// or ?furniture to see every furniture item next to Bun
const params = new URLSearchParams(window.location.search)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {params.has('gallery') ? <PlantGallery /> : params.has('furniture') ? <FurnitureGallery /> : <App />}
  </React.StrictMode>,
)
