import React, { useEffect } from 'react'
import Title from './Components/Title/Title'
import Button from './Components/Button/Button'
import TourSearch from './Components/TourSearchInput/TourSearchInput'
import axios from 'axios'

export default function App() {
 
  return (
    <div className='container'>
      <Title text={"Форма пошуку турів"} />
      <TourSearch />
      <Button />
    </div>
  )
}
