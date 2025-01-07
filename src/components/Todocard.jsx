import React, { useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import Loader from './Loader';
function Card({title,id,handleDelete}) {
  let[deleteStatus,setdeleteStatus]=useState(false);

  function handleDeleteClick(){
    setdeleteStatus(true)
    handleDelete(id)
  }
  return (
    <div>
        <div className='rounded-xl border box-border p-3 flex items-center justify-between mt-4'>
            <h1>{title}</h1>
            <button onClick={handleDeleteClick} className='text-neutral-700 hover:text-red-800'>
            {deleteStatus?<Loader/>:<FaRegTrashAlt />}
            </button>
        </div>
    </div>
  )
}

export default Card;