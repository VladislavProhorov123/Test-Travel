import React from 'react'
import './Button.css'

export default function Button({onClick, children }) {
  return (
    <button type='submit' onClick={onClick} className='btn'>{children || 'Знайти'}</button>
  )
}
