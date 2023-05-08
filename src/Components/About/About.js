import React from 'react'
import Banner from '../Banner'
import image from '../../images/JasonHeadshot.jpg'
import './About.css'
import { Container, Row, Col } from 'react-bootstrap'

export default function About() {
  return (
    <div>
      <Banner name='About' />
      <section className='bodyHeight aboutContainer'>
        <Container className="aboutInfo py-2">
          <Row className='my-auto'>
            <Col lg={5} className='profileImage p-2'>
              <img src={image} alt="Jason Pinkston" />
            </Col>
            <Col lg={7} className='aboutText p-2'>
              <h2 className='py-1 text-center mainFont'>Thanks for Vising my App!</h2>
                
              <p className='py-1'>
                My name is Jason Pinkston. This app was written in ReactJS 18 and it communicates with a 
                T-SQL database via an ASP.NET Core 6 Web API. I have implemented several npm packages for advanced 
                functionality which includes: routing via React Router Dom, API request handling through Axios, 
                authorization via Google Firebase, and form handling and schema validation using a combination 
                of Formik and Yup. The full source code is available on GitHub.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
    
  )
}
