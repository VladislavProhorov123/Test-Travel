import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import TourSearch from '../Components/TourSearch/TourSearch'
import TourPage from '../Components/TourPage/TourPage'
 

export default function Routing() {
  const [countryID, SetCountryID] = useState('')
  const [trigger, setTrigger] = useState(1)

  return (
    <Routes>
        <Route path='/' element={<TourSearch countryID={countryID} trigger={trigger} />} />
        <Route path='/tour/:priceId/:hotelId' element={<TourPage />} />
    </Routes>
  )
}
