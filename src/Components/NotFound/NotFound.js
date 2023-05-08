import React from 'react'
import image from '../../images/404 Error.avif'
import './NotFound.css'
import Banner from '../Banner'
import { Container } from 'react-bootstrap'

export default function NotFound() {
  return (
    <div>
      <Banner name='Invalid Page' />
      <Container className='bodyHeight'>
        <div className='img'>
          <img src={image} alt='404 Error' />
        </div>
      </Container>
    </div>
  )
}
