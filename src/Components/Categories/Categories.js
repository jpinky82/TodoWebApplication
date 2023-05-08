import React, {useState, useEffect} from 'react'

import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleCategory from './SingleCategory'
import Table from 'react-bootstrap/Table';
import './Categories.css'
import { useAuth } from '../../Contexts/AuthContext'
import CatCreate from './CatCreate'
import Banner from '../Banner'

export default function Categories() {

  const [categories, setCategories] = useState([]);

  const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false);

  const getCategories = () => {
    axios.get(`http://todoapi.jpinkston.com/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <section className="categories">
      
        <Banner name='Categories Dashboard' />

        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
          <div className='bg-dark p-2 text-center'>
            {showCreate ?
              <>
                  <button onClick={() => setShowCreate(false)} className="btn btn-warning">Cancel</button>
                  <CatCreate setShowCreate={setShowCreate} getCategories={getCategories} />
              </>
            : <button onClick={() => setShowCreate(true)} className='btn btn-primary'>Create Category</button>
            }
          </div>
        }
        <div className={currentUser.email === process.env.REACT_APP_ADMIN_EMAIL ? 'adminBodyHeight' : 'bodyHeight'}>
          <Container className='p-3'>
              <Table striped bordered hover className="table my-3">
                  <thead className="table-primary mainFont text-uppercase">
                      <tr>
                          <th>Name</th>
                          <th>Description</th>
                          {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                            <th className='text-center'>
                              Edit/Delete
                            </th>
                          }
                      </tr>
                  </thead>
                  <tbody>
                      {/* Below is our READ UI  */}
                      {categories.map(c => 
                          <SingleCategory key={c.categoryId} category={c} getCategories={getCategories} />
                      )}
                  </tbody>
              </Table>
          </Container>
        </div>
    </section>
  )
}
