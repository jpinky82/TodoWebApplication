import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import Logout from './Auth/Logout'

export default function Navigation() {
  const { currentUser } = useAuth()

  return (
    <Navbar expand='md' variant='dark' bg='primary' className='nav-height px-2'>
        <Navbar.Brand href='/' className='Navbar-Brand mainFont'>ReactJS Todo App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            <Nav className='mainFont'>
                <Link to='/ToDos' className='nav-link'>Todo</Link>
                <Link to='/Categories' className='nav-link '>Categories</Link>
                <Link to='/About' className='nav-link'>About</Link>
                {!currentUser ?
                  <Link to='/Login' className='nav-link'>Login</Link>:
                  <Logout />
                }
                
            </Nav>
        </Navbar.Collapse>

    </Navbar>
  )
}
