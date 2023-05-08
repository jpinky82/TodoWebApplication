import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function FilterCat(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://todoapi.jpinkston.com/api/categories`).then(response => {
            setCategories(response.data)
        })
    }, []);

  return (
    <div className='text-center pt-4 todoFilters'>
        <button className="btn btn-primary m-1 mainFont" onClick={() => props.setFilter(0)}>
            All
        </button>
        {categories.map(cat =>
            <button key={cat.categoryId} className='btn mainFont filter m-1' onClick={() => props.setFilter(+cat.categoryId)}>
                {cat.catName}
            </button>    
        )}

        {!props.showDone ?
            <button className='btn btn-primary m-1 mainFont' onClick={() => props.setShowDone(!props.showDone)}>
                Show Complete  <AiFillEye />
            </button>:
            <button className='btn btn-warning m-1 mainFont' onClick={() => props.setShowDone(!props.showDone)}>
                Hide Complete <AiFillEyeInvisible />
            </button>
        }
    </div>
  )
}
