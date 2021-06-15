import { useState, useEffect } from 'react';
import './Styles.css';
import Axios from "axios";

const ROOT_URL = 'http://localhost:3001';

function App() {


  //changed 
  //asdf asdf


  const [userName,setuserName] =useState('')
  const [status,setstatus] = useState('')
  const [userStatusList, setuserList] = useState([])

  const [newstatus, setNewstatus] = useState([])

  useEffect(()=>{
    Axios.get(ROOT_URL + '/api/get').then((Response)=> {
    setuserList(Response.data);  
    
    
    console.log(Response.data);
    });
  }, []);


  const submitstatus = () => {
    Axios.post('http://localhost:3001/api/insert', {
      userName, 
      userStatus: status
    })
    .then(() => {
      return Axios.get(ROOT_URL + '/api/get');
    })
    .then((Response)=> setUserList(Response.data));
  };

  const deletestatus = (user) => {
    //tilde key not wrapping properly ?? ` ` 
    Axios.delete(`http://localhost:3001/api/delete/${user}`)
     .then(() => {
        return Axios.get(ROOT_URL + '/api/get');
      })
      .then((Response)=> setUserList(Response.data));
    })
  };

  const updatestatus = (user) => {
    Axios.put(`http://localhost:3001/api/update/${user}`, {
      userStatus: newstatus,
    })
    .then(() => {
      setNewstatus("");
       return Axios.get(ROOT_URL + '/api/get')
    })
    .then((Response)=> setUserList(Response.data));
    
  };

  return (
    <div className="App">
      <h1>CRUD Chirper with database</h1>

      <div className="form">
      <label>Username</label>
      <input placeHolder="Who are you?" type="text" name="User" onChange={(e)=> {
        setuserName(e.target.value)
      }}/>
      <label>Chirp Status</label>
      <input placeHolder="What's on your mind?"type="text" name="Chirp" onChange={(e)=> {
        setstatus(e.target.value)
      }} />
     
      <button onClick={submitstatus}>Submit status</button>


      {userStatusList.map((val)=>{
        return <div className='card'>
          <h1>
          {val.userName}
        </h1>
        <p>{val.userStatus}</p>

        <button onClick={()=>(deletestatus(val.userName))}>Delete</button>
        <input type='text'id='updateInput' onChange={()=>{
          setNewstatus(e.target.value)
        }} />
        <button onClick={()=>{updatestatus(val.userName)}}>Update</button>

        </div>
      })}
      </div>
    </div>
  );
}

export default App;
  
