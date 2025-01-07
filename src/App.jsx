import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "../src/components/Todocard";
import Loader from "./components/Loader";

const firebaseUrl ='https://front-end-cohort-default-rtdb.asia-southeast1.firebasedatabase.app/'

function App() {

  let taskinput=useRef(null)
  let[formStatus,setformStatus]=useState(false)
  let[todos,setTodos]=useState([])

  function handleSubmit(){
    setformStatus(true)
    let task=taskinput.current.value;
    axios.post(`${firebaseUrl}todos.json`,
      {
        title:task
      }
    ).then(()=>{
      setformStatus(false)
      fetchTodos();
    })
    
  }
  
  function handleDelete(id){
    axios.delete(`${firebaseUrl}todos/${id}.json`).then(()=>{
      fetchTodos();
    })
  }
  function fetchTodos(){
    axios.get(`${firebaseUrl}todos.json`).then(todos=>{
      let tempTodos=[];
      for (let key in todos.data){
        let todo={
          id:key,
          ...todos.data[key]
        }
        tempTodos.push(todo)
      }
      setTodos(tempTodos)
    })
  }

  
  useEffect(()=>{
    fetchTodos()
  },[])

  return (
    <>
      <div  className="w-[400px] mx-auto mt-12">
      <h1 className="text-2xl font-bold">Manage your Taks!<span className="text-neutral-500">@balaji</span></h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, quaerat.</p>
      <input ref={taskinput}  className="mt-2 border rounded-xl p-3 w-full focus:outline-none border-neutral-300" type="text" placeholder="Add Tasks i.e learn how to cook" />

      <button onClick={handleSubmit} className="mt-2 rounded-xl py-3 px-5 bg-violet-200 text-violet-900 flex align-center gap-4">
        {!formStatus ? "Create Task" : <Loader/>}
      </button>

      <div className="mt-12">
     {todos.map(todo=> <Card title={todo.title} handleDelete={handleDelete} id={todo.id} key={todo.id} />) }
      </div>

      </div>

      
    </>
  )
}

export default App
