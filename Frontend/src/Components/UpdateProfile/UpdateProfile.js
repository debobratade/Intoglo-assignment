import react, { useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateProfile.css'

const UpdateProfile=()=>{

    let data  = localStorage.getItem('data')
    data = JSON.parse(data)
    

    const[fname, setFname]=useState(data.fname)
    const[lname, setlname]= useState(data.lname)
    const[file, setFile]=useState()
    const[email, setEmail]=useState(data.email)
    const[phone, setPhone]=useState(data.phone)
    const [error, setError]= useState(false)
  
    let navigate = useNavigate()
    let params = useParams()

    const updateData=async()=>{
        const formData = new FormData()
        formData.append('fname', fname )
        formData.append('lname', lname )
        formData.append('email', email )
        formData.append('phone', phone )
        formData.append('file', file )

        const config = {
            headers:{
                "Content-Type":"multipart/form-data",
                authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
            }
        }

      if(fname || lname || file || email || phone){
        const response=  axios.put(`http://localhost:5000/user/${params.Id}`, formData, config )
        .then (res=>{
          alert('successful')
            
             localStorage.setItem('data', JSON.stringify(res.data.data))
            navigate('/profile')
          })
          .catch(err=>alert(err.response.data.message))
         
    }else{
        alert('Kindly enter any field to update')
    }
}

    return(
        <>
        <h1>Update</h1>
        
        <div className="boxu">
            <input className="inputBox" type='text' value={fname} onChange={(e)=>setFname(e.target.value)} placeholder="Enter First Name"/>
            <input className="inputBox" type='text' value={lname} onChange={(e)=>setlname(e.target.value)} placeholder="Enter Last Name"/>
          
            <input className="inputBox" type='file' name="img"  accept=".jpeg, .png, .jpg" onChange={(e)=>setFile(e.target.files[0])}/>
            { error || !fname && !lname && !file && !email && !phone && <span className="invalid-input">Enter a valide input</span>}

            <input className="inputBox" type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
            <input className="inputBox" type='text' value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Phone"/>
           
   
            <button onClick={updateData} className="btn" type="button">Update</button>
        </div>
        </>
    )
}


export default UpdateProfile