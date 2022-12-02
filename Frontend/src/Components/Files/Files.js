import react, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Files.css'

const Files=()=>{

    let nav = useNavigate()
    const [docs, setDocs] = useState([]);

    let data = localStorage.getItem('data')
    data = JSON.parse(data)
    let Id = data._id


    useEffect(() => {
        getDocs();
      }, []);

    const getDocs = async () => {
        let result = await fetch(`http://localhost:5000/getDocs/${Id}`,{
          headers:{
            authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
          }
      })
        result = await result.json();
       if(result.length>0){
        setDocs(result);
        localStorage.setItem("docs",JSON.stringify(result))
       }
      };


   const viewProduct=(file)=>{   
    window.open(file, "_blank");
   }

   const deleteProduct = async (Id) => {
    let result = await fetch(`http://localhost:5000/deletedoc/${Id}`, {
      method: "Delete",
      headers:{
        authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
  
    if (result.status===true) {
      alert(result.message);
      getDocs();
    }else{
      alert(result.message)
    }
  };




    return (
        <div className="midlle">
      {
       
      docs.length>0 ? docs.map((item, index) => (
        <ul key={index}>
          <li >
            {
          <div className='card' >
            {}
          <img src={item.logo} alt={item.file}/>
          <article>  {item.title}</article><br/>
             <div className='bttn' >
            <button className="cart-btn" onClick={() => viewProduct(item.file)}>View</button>
             <button className="cart-btn" onClick={() => nav(`/open/${item._id}`)}>Open</button>
             <button className="cart-btn" onClick={() => deleteProduct(item._id)}>Delete</button>
             </div>
             </div>
       
 } </li>
        </ul>
      ))
      : <h1>No result found</h1>
      }
    </div>
    )
}

export default Files