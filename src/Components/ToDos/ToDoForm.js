import React, {useState, useEffect} from 'react'
import { Formik, Form, Field } from 'formik'
import { todoSchema } from '../../Utilities/validationSchema'
import axios from 'axios'

export default function ToDoForm(props) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://todoapi.jpinkston.com/api/Categories`).then(response => setCategories(response.data))
    }, []);

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo) {
            const newToDo = {
                name: values.name,
                done: false,
                categoryId: values.categoryId
            }
            axios.post(`http://todoapi.jpinkston.com/api/todos`, newToDo).then(() => {
                props.setShowCreate(false)
                props.getTodos()
            })
        }else {
            const todoEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                done: values.done,
                categoryId: values.categoryId
            }
            axios.put(`http://todoapi.jpinkston.com/api/todos/${props.todo.toDoId}`, todoEdit).then(() => {
                props.setShowEdit(false)
                props.getTodos()
            })
        }
    }


  return (
    <Formik
        initialValues={{
            name: props.todo ? props.todo.name : '',
            done: props.todo ? props.todo.done : false,
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}>

        {({errors, touched}) => (
            <Form id='todoForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control' placeholder='Name' />
                    {errors.name && touched.name && <div className='text-danger'>{errors.name}</div>}
                </div>
                <div className='form-group m-3'>
                    <Field name='categoryId' as='select' className='form-control'>
                        <option value='' disabled>
                            [--Please Choose--]
                        </option>
                        {categories.map(cat => 
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>    
                        )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-primary m-3'>
                            Submit ToDo to API
                    </button>
                </div>
            </Form>
        )}     
    </Formik>
  )
}
