import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';
import NavLogin from './NavLogin'
import 'bootstrap/dist/css/bootstrap.css'

function CreatePost() {


    

    var [caption,setCaption] = useState("")
    var [image,setImage] = useState("")

    let history = useHistory();
    const JWTtoken = localStorage.getItem('JWTtoken')

    const submitHandler = (e) => {



        e.preventDefault()
        setCaption("")
        
        const formData = new FormData()
        formData.append('image', image)
        formData.append('caption', caption)
        axios.post("http://localhost:3001/posts",formData,{
          headers:{
            'auth-token':JWTtoken
          }
        })
        .then((data)=>{
          if(data.status===200){
          console.log(data)
          alert('Post Added Successfully')
          history.push('/profile')
        }
        if(data.status===400){
          localStorage.removeItem("JWTtoken")
        }
        })
        .catch((err)=>{
          console.log({message:err})
          history.push('/unauthorized')
        })
    }

    
    var Button
    if(JWTtoken)
      Button = <NavLogin></NavLogin>
    else
      Button = <NavBar></NavBar>

  return (
    <div>
      {Button}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
        <form  onSubmit={submitHandler} style={{padding:"50px"}}>
            <label style={{padding:"25px",color:"black"}}>Caption</label>
            <input value={caption} onChange={e=>{setCaption(e.target.value)}} type="text"></input><br></br>
            <input style={{padding:"25px",color:"black"}} accept="image/*" onChange={e=>{setImage(e.target.files[0]); console.log(e.target.files)}} type="file"></input><br></br>
            <label style={{padding:"25px",color:"black"}}>   
              {image.preview?
              <img src={image.preview}  alt="dummy" width="300" height="300"></img>:
              <p>Upload pic</p>}
            </label><br></br>
            <button className="btn btn-outline-success" type="submit">Post</button>
        </form>
        </div>
        </div>
      </div>
     
      
    </div>
  );
}

export default CreatePost;
