import react, { useEffect, useState } from 'react'
import Highlighter from "react-highlight-words";
import { useParams } from 'react-router-dom'
import './Open.css'

const Open=()=>{

    
    const [text, setText] = useState('');
    
   

const param=useParams()


useEffect(()=>{
    getDocs()
    
},[])


const getDocs=async()=>{
    let  result= await fetch(`http://localhost:5000/getdoc/${param.id}`,{
        headers:{
            authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
          }
     });
    
         result=await result.json()

         if(result.status==true){
         setText(result.result)
         }else{
            alert(result.message)
         }
 }


 const searchHandle=()=>{
         
     const p=document.getElementById('p')
let input = document.getElementById("input").value;

if(input !==""){
    let regex = new RegExp(input, "gi");
    let bl=(p.textContent).match(regex);
    if(bl){
        alert("Present")
    }else{
         alert("Not present")
        
    }
  
}

}

    return (
        <>
         <div className="searchbar">
       
        <input
          className="searchbox"
          type="text"
          id='input'
          placeholder="Search keyword"
       
        />

        <input type='button' id='searchbtn' value='search' onClick={searchHandle}/>
        </div>
        <div>
        <h1>Open</h1>
    
       
              <textarea id='p'
                className="form-control"
                rows="30"
                value={text}
                
              ></textarea>


       </div>
       </>
    )
}

export default Open