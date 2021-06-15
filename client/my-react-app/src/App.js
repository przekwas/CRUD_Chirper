import { useState, useEffect } from 'react';
import './Styles.css';
import Axios from "axios";

function App() {


  //changed 
  //asdf asdf


  const [userName,setuserName] =useState('')
  const [status,setstatus] = useState('')
  const [userStatusList, setuserList] = useState([])

  const [newstatus, setNewstatus] = useState([])

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((Response)=> {
    setuserList(Response.data);  
    
    
    console.log(Response.data);
    });
  }, []);


  const submitstatus = () => {
    
    
    Axios.post('http://localhost:3001/api/insert',
    {userName: userName, 
    userStatus: status,
  });
    
  setuserList([
    ...userStatusList, 
    {userName: userName, userStatus: status},
      ]);
      
      //test
      // alert('successful insert');
  };

  const deletestatus = (user) => {
    //tilde key not wrapping properly ?? ` ` 
    Axios.delete(`http://localhost:3001/api/delete/`+$(user));
  };

  const updatestatus = (user) => {
    Axios.put(`http://localhost:3001/api/update`, {
      userName: user,
      userStatus: newstatus,
    });
    setNewstatus("")
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


      {userStatusList.map(()=>{
        return <div className='card'>
          <h1>
          {val.userName}
        </h1>
        <p>{val.userStatus}</p>

        <button onClick={()=>(deletestatus(value.userName))}>Delete</button>
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
  