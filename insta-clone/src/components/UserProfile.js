import axios from 'axios'
import React,{useEffect,useState,useContext} from 'react'
import NavBar from './NavBar';
import { useHistory,Link } from 'react-router-dom';
import NavLogin from './NavLogin';
import 'bootstrap/dist/css/bootstrap.css'
import profilepic from '../assets/images/image.jfif'
import { useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import FollowersModal from './FollowersModal';
import FollowingModal from './FollowingModal';
import userImg from '../assets/images/userImg.png'

function UserProfile() {
  var [userposts,setUserposts] = useState([])
  var [u,setU] = useState({})
  var [userprofile,setUserprofile] = useState([])
  var [following,setFollowing] = useState([])
  var [followers,setFollowers] = useState([])
  var [ufollowing,setUFollowing] = useState([])
  var [ufollowers,setUFollowers] = useState([])
  var [user,setUser] = useState({})
  var [loaded,setLoaded] = useState(false)


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


        axios.get(`http://localhost:3001/user/${userId}`,{
          headers:{
              'auth-token':JWTtoken
            }
          })
        .then(res=>{
          console.log(res)
          setUserprofile(res.data.posts)
          setU(res.data.user)
          setUFollowers(res.data.user.followers)
          setUFollowing(res.data.user.following)
          setLoaded(true)
        })

        
        
    },[followers,following])

    const follow = (id,name) => {
      console.log(id)
      axios.put("http://localhost:3001/user/follow",{"followId":id,"name":name},{
        headers:{
          'auth-token':JWTtoken
        }
      })
      .then(res=>{
        console.log(res)
        setFollowing(res.data.following)
        setFollowers(res.data.followers)
      })
    }


    const unfollow = (id,name) => {
      console.log(id)
      axios.put("http://localhost:3001/user/unfollow",{"followId":id,"name":name},{
        headers:{
          'auth-token':JWTtoken
        }
      })
      .then(res=>{
        console.log(res)
        setFollowing(res.data.following)
        setFollowers(res.data.followers)
      })
    }

    if(u.followers){
      var l = u.followers.length
    }
    else{
      var l = 0
    }
    if(l==0){
      var followbutton =  <button class="btn btn-primary" onClick={()=>follow(u._id,u.name)}>Follow</button>
    }
    else{
      for(var i=0;i<l;i++){
          if(u.followers[i].followedBy==user._id)
            var followbutton =  <button class="btn btn-outline-primary" onClick={()=>unfollow(u._id,u.name)}>unFollow</button>
          else
            var followbutton =  <button class="btn btn-primary" onClick={()=>follow(u._id,u.name)}>Follow</button>
      }
    }
     







    console.log(u.followers)

    var Button
    if(JWTtoken)
      Button = <NavLogin></NavLogin>
    else
      Button = <NavBar></NavBar>


    return (
      <>
      {(loaded) ? 
      <div>
      {Button}
      <div id="profile-cont" className="container">
       <div className="row" >
          <div className="col-4 my-auto" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {
              (u.profileImg)?
              <img className="profile-pic" src={u.profileImg}></img>
              :
              <img src={userImg} className="profile-pic"></img>
            }
            
          </div>
          <div className="col-8 my-auto" style={{marginTop:"center",marginBottom:"center"}}>
              <h5>{u.name}</h5>
              <div id="user-stats">
                <ul style={{listStyle:"none",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                  <li style={{display:"flex"}}>
                    <b>{(userprofile)?userprofile.length:<>0</>}</b> <button style={{padding:"5px",marginLeft:"10px",marginTop:"-3px"}} class="btn btn-outline-info">Posts</button>
                  </li>
                  <li style={{display:"flex"}}>
                    <b>{(u.followers)?u.followers.length:<>0</>}</b> <FollowersModal ufollowers={ufollowers}/>
                  </li>
                  <li style={{display:"flex"}}>
                    <b>{(u.following)?u.following.length:<>0</>}</b> <FollowingModal ufollowing={ufollowing}/>
                  </li>
                </ul>
              </div>
{/* 
              {
                ((u.followers.includes(user._id)))?
                <div>
                 <button class="btn btn-outline-primary" onClick={()=>unfollow(u._id,u.name)}>unFollow</button>
                </div>:
                <div>
                 <button class="btn btn-primary" onClick={()=>follow(u._id,u.name)}>Follow</button>
                </div>
              } */}
              {followbutton}
  

          </div>
       </div>
      </div>

       
   <hr></hr>

   <div id="res-stats">
          <ul style={{listStyle:"none",display:"flex",justifyContent:"space-around",alignItems:"center",padding:"0px"}}>
                   <li style={{display:"flex"}}>
                     <b>{(userposts)?userposts.length:<>0</>}</b> <button style={{padding:"5px",marginLeft:"10px",marginTop:"-3px"}} class="btn btn-outline-info">Posts</button>
                   </li>
                   <li style={{display:"flex"}}>
                     <b>{(user.followers)?user.followers.length:<>0</>}</b> <FollowersModal ufollowers={ufollowers}/>
                   </li>
                   <li style={{display:"flex"}}>
                     <b>{(user.following)?user.following.length:<>0</>}</b> <FollowingModal ufollowing={ufollowing}/>
                   </li>
                 </ul>
                 <hr></hr>
        </div>

    <div className="grid-container">


     
              {userprofile.map(post=>(
                <>
                <div className="post-cont">
                  <img className="posts" src={post.image}>
                  </img>
                  <div className="post-stats">
                  
                      <p className="post-stats-item"><i class="fas fa-heart" aria-hidden="true"></i> {post.likes.length} </p>
                      <p className="post-stats-item"><i class="fas fa-comment" aria-hidden="true"></i> {post.comments.length} </p>

                  </div>
                  </div>
            
                </>
              ))}
 
           
    </div>
   
    
   
    </div>:<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}> <h2><Spinner color="danger" /></h2></div>}
        
        </>
    )
}

export default UserProfile
