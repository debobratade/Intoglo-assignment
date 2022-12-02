import react, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import { useNavigate } from 'react-router-dom'
const Home=()=>{

  let data = localStorage.getItem('data')
  data = JSON.parse(data)
   
    const [file, setFile]= useState()
    const[title, setTitle]= useState()
    const[Id, setId]= useState(data._id)

const nav = useNavigate()


   


    const hadleSubmit= async()=>{
        const formData = new FormData()

        formData.append('Id', Id )
        formData.append('file', file )
        formData.append('title', title )

        const config = {
            headers:{
                "Content-Type":"multipart/form-data",
                authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
            }
        }

       if(file && title){
       let response =  axios.post('http://localhost:5000/upload', formData, config )
         .then (res=>{
        
          nav('/files')
          alert('successful')
        })
         .catch(err=>alert(err.response.data.message))
      }else if(!file && title){
        alert('Kindly enter the file')
      }
      else if(file && !title){
        alert('Kindly enter the title')
      }
      
      else{
        alert('Kindly enter any field to add')
      }
       

     

    }

    return(
        <>
        <div className='mainBox'>
        <form onSubmit={hadleSubmit}>
         
          <div className="form-group">
            <h3 >Upload File</h3>
            <input className="in" type='text' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title"/>
            <input
              type="file"
              name="file"
              className="in"
              accept=".pdf, .excel, .csv, .xlsx, .jpeg, .png"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
  
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </form>
        </div>
      </>
    )
}

export default Home