import React from 'react'
//In this login component we need acccess to the login function stored in our AuthContext.
//There are always 3 steps to implementing any of our context values 
//Step 1: Import the useAuth function
import { useAuth } from '../../Contexts/AuthContext'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Banner from '../Banner'


export default function Login() {
  //Step 2: destructure the needed object(s) off of the useAuth() function
  const {login} = useAuth()
  //we want a way to redirect the user back home once they log in
  const navigate = useNavigate()

  //below we write a custom handler function to handle a user logging in
  async function handleAuth() {
      //Await keyword pauses any more code from executing until we get a response from firebase
      await login()

      //return the user to a specific location using useNavigate hook from react-router-dom
      return navigate('/')
  }

  return (
        //Step 3: Create teh UI and use the login function as needd.
    <div className='login'>
      <Banner name='Welcome to React Todo!' />
      <Container className='p-4 col-md-6 bodyHeight'>
          <Card className='m-2 border-dark text-center'>
              <Card.Header className='head text-white'>
                  <h2>Login for full functionality</h2>
              </Card.Header>
              <Card.Body>
                <div className='imgContainer'>
                    <img src= {require ("../../images/github.png")} alt="GitHub" className='githubImg' />
                </div>
                <button className="btn btn-color loginBtn" onClick={() => handleAuth()}>
                    Login w/GitHub
                </button>
              </Card.Body>
          </Card>
      </Container>
    </div>
  )
}
