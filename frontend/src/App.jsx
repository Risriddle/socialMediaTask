import React from 'react'
import UserForm from './components/UserForm'
import Layout from './components/Layout'
import AdminDashboard from './components/AdminDashboard'

import { Routes, Route, BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
  
          <Route element={<Layout />} path="/">
            <Route element={<UserForm />} index />
            <Route element={<AdminDashboard />} path="adminDashboard" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
