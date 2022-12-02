
import './App.css';

import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import PrivateComponent from './Components/PrivateComponent';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Files from './Components/Files/Files';
import Open from './Components/OpenFileWithTesseract/Open';
import Profile from './Components/Profile/Profile';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';

function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
    
    <Navbar/>
    <Routes>

     <Route element={<PrivateComponent/>}>
     <Route path='/' element={<Home/>}/>
     <Route path='/logout' element={<h1>Logout</h1>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/files' element={<Files/>}/>
     <Route path='/open/:id' element={<Open/>}/>
     <Route path='/update/:Id' element={<UpdateProfile/>}/>
     
     </Route>
     
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
