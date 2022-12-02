
import react from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile=()=>{

    const nav=useNavigate()

  let data  = localStorage.getItem('data')
  data = JSON.parse(data)
 

    return(
        <>
        <h1>Profile</h1>
         
        <div className='profileg'>
            <img src={data.profileImage} alt={data._id}/>
            <h3>{data.fname+" "+data.lname}</h3>
            <article>{data.email}</article>

            <button className='butn' onClick={()=>nav('/files')}>My files</button>
            <button className='butn' onClick={() => nav(`/update/${data._id}`)}>Update</button>
        </div>
        </>
    )
}

export default Profile