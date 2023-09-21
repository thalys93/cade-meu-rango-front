import React from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

function BackComponent() {
  return (
    <Link className='text-4xl' to='/'>
          <BiArrowBack/>              
    </Link>
  )
}

export default BackComponent