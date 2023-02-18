import './App.css'

import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './Header'
import Adventurer from './Adventurer'
import Quest from './Quest'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Adventurer />} />
        <Route path='quest/:tokenId' element={<Quest />} />
      </Route>
    </Routes>
  )
}

export default App
