import React, {useState} from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { GrEdit, GrTrash } from "react-icons/gr";
import CatEdit from './CatEdit'
import axios from 'axios';

export default function SingleCategory(props) {

  const { currentUser } = useAuth()

  const [showEdit, setShowEdit] = useState(false);

  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.catName}?`)){
      axios.delete(`http://todoapi.jpinkston.com/api/Categories/${id}`).then(() => props.getCategories())
    }
  }

  return (
    <tr>
        <td>{props.category.catName}</td>
        <td>{props.category.catDesc}</td>

        {/* Edit UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
          <td className='text-center'>
            <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}>
              <GrEdit />
            </button>
            <button className='m-1 rounded' id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>
              <GrTrash />
            </button>
            {showEdit &&
              <CatEdit 
                setShowEdit={setShowEdit}
                showEdit={showEdit}
                getCategories={props.getCategories}
                category={props.category} />
            }
          </td>
        }
    </tr>
  )
}