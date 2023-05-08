import React from 'react'
import Banner from '../Banner'
import { useAuth } from '../../Contexts/AuthContext'
import { Container, Row, Col } from 'react-bootstrap'
import './Profile.css'

export default function Profile() {
    const { currentUser } = useAuth()
    console.log(currentUser)

  return (
    <div>
        <Banner name='Profile' />
        <div className='bodyHeight profile'>
            <Container className='profileContainer py-2'>
                <Row className='my-auto'>
                    <Col lg={5} className='profilePic'>
                        <img src={currentUser.photoURL} alt={`${currentUser.displayName} Github avatar`} />
                    </Col>
                    <Col lg={7} className='profileInfo'>
                        <h3 className='text-center mainFont'>Profile Info</h3>
                        <br />
                        <p><em>Name:</em> {currentUser.displayName}</p>
                        <p><em>Email:</em> {currentUser.email}</p>
                        <p><em>Phone:</em> {currentUser.phoneNumber ? currentUser.phoneNumber : <span>N/A</span>}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    
    </div>
  )
}
