import React, { useState,useEffect } from "react";
import axios from 'axios'
import NavBar from './NavBar';
import { useHistory } from "react-router";
import NavLogin from "./NavLogin";
import { Link } from "react-router-dom";
import { Spinner } from 'reactstrap';
import ModalExample from "./CommentModal";



function Post(props) {

  var [posts, setPosts] = useState([]);
  var [user,setUser] = useState({})
  var [loaded,setLoaded] = useState(false)
  var [text,setText] = useState("")
  var [likes,setLikes] = useState([])


  let history = useHistory()
  const JWTtoken = localStorage.getItem('JWTtoken')

useEffect(()=>{
  axios.get("http://localhost:3001/posts",{
    headers:{
      'auth-token':JWTtoken
    }
  })
  .then(res=>{
  if(res.status===200){
    console.log(res)
    setPosts(res.data)
    setLoaded(true)
  }
  })
  .catch(err=>{
    console.log({message:err})
    history.push('/unauthorized')
  })

  axios.get("http://localhost:3001/user",{
          headers:{
              'auth-token':JWTtoken
            }
          })
        .then(res=>{
          console.log(res)
          setUser(res.data)
        })
},[])


const likeCounter  = (id)  => {
 
   axios.put("http://localhost:3001/posts/like",{"postId":id},{
      headers:{
        'auth-token':JWTtoken
      }
    })
    .then(res=>{
      console.log(res)
      const newData = posts.map(post=>{
        if(post._id==res.data._id && post.postedBy.name==res.data.postedBy.name)
          return res.data
        else
          return post
      })
      
      console.log([...newData])
      setPosts([...newData])
      setLikes([...res.data.likes])
      console.log(res.data.likes)
    })

}

const unlikeCounter  = (id)  => {
 
  axios.put("http://localhost:3001/posts/unlike",{"postId":id},{
     headers:{
       'auth-token':JWTtoken
     }
   })
   .then(res=>{
     console.log(res)
     const newData = posts.map(post=>{
       if(post._id==res.data._id && post.postedBy.name==res.data.postedBy.name)
         return res.data
       else
         return post
     })
     
     console.log([...newData])
     setPosts([...newData])
     setLikes([...res.data.likes])
     console.log(res.data.likes)
   })


}

const submitHandler = (text,postId) => {
  axios.put("http://localhost:3001/posts/comment",{"text":text,"postId":postId},{
    headers:{
      'auth-token':JWTtoken
    }
    })
  .then(res=>{
    console.log(res.data)
    const newData = posts.map(post=>{
      if(post._id==res.data._id)
        return res.data
      else
        return post
    })
    
    console.log([...newData])
    setPosts([...newData])
  })
  .catch(err=>{
    console.log({message:err})
  })
}






var Button
if(JWTtoken)
  Button = <NavLogin></NavLogin>
else
  Button = <NavBar></NavBar>

  return (
    <>
         {Button}

      
    {loaded?
    <div>
 
            {posts.map((post) => (
              <>
                <main style={{border:"2px solid black"}}>
                <div className="head">
                  <div className="image">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="username"><Link style={{color:"black"}} to={(post.postedBy._id!==user._id)?"/profile/"+post.postedBy._id:"/profile"}>{post.postedBy.name}</Link></div>
                </div>
                <div className="body">
                  <img style={{maxHeight:"100%",maxWidth:"100%",objectFit:"cover"}} src={post.image}></img>
                </div>
                <div className="foot">
                  <div>
                    {
                      (post.likes.includes(user._id)?
                      
                       <div>
                         <button id="unlike" style={{border:"none",background:"white"}} onClick={()=>{unlikeCounter(post._id)}}><i className="fas fa-heart fa-lg"></i></button> {post.likes.length}
                       </div>
                      
                      :
                      <div>
                      <button id="like" style={{border:"none",background:"white"}} onClick={()=>{likeCounter(post._id)}}><i className="far fa-heart fa-lg"></i></button> {post.likes.length}  
                      </div>
                      )
                    }
                  </div>
                  <div className="comment">
                    <button onClick={()=>document.getElementById("commentinput").focus()} style={{border:"none",background:"white"}}><i className="far fa-comment fa-lg"></i></button>
                  </div>
                </div>
                <div className="caption">
                  <b>{post.postedBy.name}</b>&nbsp;
                  {post.caption}
                </div>
                
                <div style={{textAlign:"left",marginLeft:"15px"}}>
                <ModalExample post={post}/>
                </div>
   
                <div className="addcomment">
                  <form style={{display:"flex",width:"100%"}} onSubmit={(e)=>{
                    e.preventDefault()
                    console.log(e.target[0].value)
                    submitHandler(e.target[0].value,post._id)
                    }}>
                   <input id="commentinput" type="text"></input>
                   <button class="btn btn-info" type="submit">Add</button>
                  </form>
                </div>
                </main>
              </>
            

  ))}
         
    </div>:<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}> <h2><Spinner color="danger" /></h2></div> }

    </>
    
 
  );
}

export default Post;
