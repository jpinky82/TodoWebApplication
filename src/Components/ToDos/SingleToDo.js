import React, {useState} from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { GrEdit, GrTrash } from "react-icons/gr";
import ToDoEdit from './ToDoEdit'
import axios from 'axios';


export default function SingleToDo(props) {

  const { currentUser } = useAuth()
  const [showEdit, setShowEdit] = useState(false);

  const flipDone = () => {
    let updatedToDo = {
      toDoId: props.todo.toDoId,
      name: props.todo.name,
      done: !props.todo.done,
      categoryId: props.todo.categoryId
    }
    axios.put(`http://todoapi.jpinkston.com/api/todos/${props.todo.toDoId}`, updatedToDo).then(response => {
        console.log(response)
        props.getTodos()
    })
  }

  const deleteTodo = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.todo.name}?`)){
      axios.delete(`http://todoapi.jpinkston.com/api/todos/${id}`).then(() => {props.getTodos()})
    }
  }

  return (
    <tr>
        <td className='text-center'>
            <input className='checkbox' type='checkbox' checked={props.todo.done} onChange={() => flipDone()} />
        </td>
        <td>{props.todo.name}</td>
        <td>{props.todo.category.catName}</td>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
          <td className='text-center'>
            <button id='editLink' onClick={() => setShowEdit(true)}>
              <GrEdit />
            </button>
            <button id='deleteLink' onClick={() => deleteTodo(props.todo.toDoId)}>
              <GrTrash />
            </button>

            {showEdit &&
            <ToDoEdit 
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              todo={props.todo}
              getTodos={props.getTodos} />
            }
          </td>
        }
    </tr>
  )
}
