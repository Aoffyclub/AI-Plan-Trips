import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreatTrip from './trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/index.jsx'
import MyTrip from './my-trip/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreatTrip />
  },
  {
    path: '/view-trip/:id',
    element: <ViewTrip />
  },
  {
    path: '/my-trip',
    element: <MyTrip />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
