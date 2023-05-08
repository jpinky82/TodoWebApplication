import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import SingleToDo from './SingleToDo'
import { useAuth } from '../../Contexts/AuthContext';
import FilterCat from './FilterCat'
import ToDoCreate from './ToDoCreate'
import Banner from '../Banner'
import './todo.css'

export default function ToDos() {

  const [todos, setTodos] = useState([]);

  const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState();

  const [filter, setFilter] = useState(0);

  const [showDone, setShowDone] = useState(false);

  const getTodos = () => {
    axios.get(`http://todoapi.jpinkston.com/api/todos`).then(response => {
      console.log(response.data)
      setTodos(response.data)
    })
  }

    useEffect(() => {
      getTodos()
    }, []);

  return (
    <section className="todos">
      <Banner name='ToDos Dashboard' />

      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 createHeight text-center">
            <button className='btn btn-primary' onClick={() => setShowCreate(!showCreate)}>
              {!showCreate ? 'Create New Todo' : 'Close Form'}
            </button>
            
              {showCreate &&
                <div className='createContainer'>
                  <ToDoCreate setShowCreate={setShowCreate} getTodos={getTodos} />
                </div>
              }
        </div>
      }
      <div className={currentUser.email === process.env.REACT_APP_ADMIN_EMAIL ? 'adminBodyHeight' : 'bodyHeight'}>
        <FilterCat setFilter={setFilter} showDone={showDone} setShowDone={setShowDone} />
        <Container>
          <Table striped bordered hover className='table my-3 todoTable'>
            <thead className='table-primary mainFont text-uppercase'>
              <tr>
                <th className='text-center'>Done?</th>
                <th>Task</th>
                <th>Category</th>
                {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                  <th className='text-center'>Edit/Delete</th>
                }
              </tr>
            </thead>
            <tbody>
              {!showDone ?
                <>
                  {filter === 0 ? todos.filter(t => t.done === false).map(t => 
                    <SingleToDo key={t.toDoId} todo={t} getTodos={getTodos} />
                    ) :
                    todos.filter(t => t.done === false && t.categoryId === filter).map(t => 
                      <SingleToDo key={t.toDoId} todo={t} getTodos={getTodos} />  
                    )}
                </> :
                <>
                  {filter === 0 ? todos.map(t =>
                    <SingleToDo key={t.toDoId} todo={t} getTodos={getTodos} />
                    ) :
                    todos.filter(t => t.categoryId === filter).map(t => 
                      <SingleToDo key={t.toDoId} todo={t} getTodos={getTodos} />    
                  )}
                </>
              }
            </tbody>
          </Table>
              {!showDone ?
                <>
                  {filter !== 0 && todos.filter(t => t.done === false && t.categoryId === filter).length === 0 &&
                    <h2 className='alert alert-warning text-dark'>
                      There are no incomplete ToDo items in this Category.
                    </h2>
                  }
                </> :
                <>
                  {filter !== 0 && todos.filter(t => t.categoryId === filter).length === 0 && 
                  <h2 className='alert alert-warning text-dark'>
                    there are no ToDo items in this category.
                  </h2>
                  }
                </>
              }
        </Container>
      </div>
    </section>
  )
}
