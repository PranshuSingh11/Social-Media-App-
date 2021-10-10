import axios from 'axios'
import React,{useEffect,useState,useContext} from 'react'
import NavBar from './NavBar';
import { useHistory } from 'react-router';
import NavLogin from './NavLogin';
import 'bootstrap/dist/css/bootstrap.css'
import profilepic from '../assets/images/image.jfif'
import { useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import FollowersModal2 from './FollowersModal2'
import FollowingModal2 from './FollowingModal2'
import userImg from '../assets/images/userImg.png'

function Profile() {
  var [userposts,setUserposts] = useState([])
  var [user,setUser] = useState({})
  var [loaded,setLoaded] = useState(false)
  var [image,setImage] = useState('')


  
  var {userId} = useParams()



  let history = useHistory()
  const JWTtoken = localStorage.getItem("JWTtoken")


    useEffect(() => {

      
        axios.get("http://localhost:3001/posts/myposts",{
            headers:{
                'auth-token':JWTtoken
            }
        })
        .then(res=>{
          if(res.status===200){
            console.log(res)
            setUserposts(res.data)
          }
        setLoaded(true)
        })
        .catch(err=>{
          console.log(err)
          history.push('/unauthorized')
        
        })


        axios.get('http://localhost:3001/user',{
          headers:{
              'auth-token':JWTtoken
            }
          })
        .then(res=>{
          console.log(res)
          setUser(res.data)
        })


        
    }, [image,setImage])


  

 const profileupdate = (e) => {
   e.preventDefault()
   const formdata =  new FormData()
   
    formdata.append('image', image)
    axios.post('http://localhost:3001/user/profileImg',formdata,{
      headers:{
        'auth-token':JWTtoken
      }
    })
    .then(res=>{
      console.log(res)
      setImage(res.data)
    })
    .catch(err=>{
      alert('Refresh and try again')
    })
    setImage("")
 }



    var Button
    if(JWTtoken)
      Button = <NavLogin></NavLogin>
    else
      Button = <NavBar></NavBar>

    return (
      <>
      {loaded?
       <div>
       {Button}
       


       <div id="profile-cont" className="container">
        <div className="row" >
           <div className="col-4 my-auto" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
           {
              (user.profileImg)?
              <img className="profile-pic" src={user.profileImg}></img>
              :
              <img src={userImg} className="profile-pic-default"></img>
            } 
           </div>
           <div className="col-8 my-auto">
               <h5>{user.name}</h5>
               <div id="stats">
                 <ul style={{listStyle:"none",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                   <li style={{display:"flex"}}>
                     <b>{(userposts)?userposts.length:<>0</>}</b> <button style={{padding:"5px",marginLeft:"10px",marginTop:"-3px"}} class="btn btn-outline-info">Posts</button>
                   </li>
                   <li style={{display:"flex"}}>
                     <b>{(user.followers)?user.followers.length:<>0</>}</b>  <FollowersModal2 user={user}/>
                   </li>
                   <li style={{display:"flex"}}>
                     <b>{(user.following)?user.following.length:<>0</>}</b> <FollowingModal2 user={user}/> 
                   </li>
                 </ul>
               </div>
           </div>
        </div>
       </div>

       <div style={{display:"flex",justifyContent:"center"}}> <span style={{marginTop:"5px"}}>Edit Profile Image</span><form onSubmit={profileupdate}><label style={{color:"grey",textDecoration:"underline"}} for="file-upload"><span style={{padding:"10px"}}>Upload File</span></label><input accept="image/*" id="file-upload" style={{opacity:"0",zIndex:"-1",position:"absolute",width:"25px"}} onChange={e=>{setImage(e.target.files[0]); console.log(e.target.files)}} type="file"></input><button className="btn btn-outline-dark" type="submit">Submit</button></form></div>

    <hr></hr>
        <div id="res-stats">
          <ul style={{listStyle:"none",display:"flex",justifyContent:"space-around",alignItems:"center",padding:"0px"}}>
                   <li style={{display:"flex"}}>
                     <b>{(userposts)?userposts.length:<>0</>}</b> <button style={{padding:"5px",marginLeft:"10px",marginTop:"-3px"}} class="btn btn-outline-info">Posts</button>
                   </li>
                   <li style={{display:"flex"}}>
                     <b>{(user.followers)?user.followers.length:<>0</>}</b> <FollowersModal2 user={user}/>
                   </li>
                   <li style={{display:"flex"}}>
                     <b>{(user.following)?user.following.length:<>0</>}</b> <FollowingModal2 user={user}/> 
                   </li>
                 </ul>
                 <hr></hr>
        </div>
  



                <div className="grid-container">
                  {userposts.map(post=>(
                <div className="post-cont">
                  <img className="posts" src={post.image}>
                  </img>
                  <div className="post-stats">
                  
                      <p className="post-stats-item"><i class="fas fa-heart" aria-hidden="true"></i> {post.likes.length} </p>
                      <p className="post-stats-item"><i class="fas fa-comment" aria-hidden="true"></i> {post.comments.length} </p>

                  </div>
                  </div>
            
                
              ))}
              </div>
    
     
    
     </div> :<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}> <h2><Spinner color="danger" /></h2></div>}
       
        </>
    )
}

export default Profile
