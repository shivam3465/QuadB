import React from 'react'
import './header.scss'
import { Person } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
        <div className="left"><span>Movie</span> <span>Page</span></div>
        <div className="right">
            <Link to={'/'}>Home</Link>
            <Link to={'/movies'}>Movies</Link>
            <Link to={'/tv'}>Tv shows</Link>
            <Link to={'/Login'}><Person/></Link>
        </div>
    </div>
  )
}
