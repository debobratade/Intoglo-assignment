import React from 'react';
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import imageLogo from '../../images/logo.jpg'


const Navbar=()=>{
   
    let data = localStorage.getItem('data')
    data = JSON.parse(data)
    const navigate = useNavigate()

    const logout=()=>{
        localStorage.clear()
        navigate('/signup')
    }
    return (
        
        
        
        <div>
           <img className='logoStyle' src={imageLogo} alt='Display is missing'/>
           <p className='titleStyle'>Intoglo</p>
     {
         data ? <ul className='nav-ul'>
            <img className='log' src={data.profileImage} alt={data.name}/>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/files'>Files</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li> <Link onClick={logout} to='/signup'>Logout [{data.fname}]</Link> </li>
            
        </ul>
        :
        <ul className='nav-ul nav-right'>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
      }
       </div>
       
    )
}

export default Navbar