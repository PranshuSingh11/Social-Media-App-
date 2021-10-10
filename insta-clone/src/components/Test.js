import React, { useState,useEffect } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const Example = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [users,setUsers] = useState([])
  const [user,setUser] = useState({})
  const [search,setSearch] = useState('')

  const toggle = () => setPopoverOpen(!popoverOpen);

  const JWTtoken = localStorage.getItem('JWTtoken')
  useEffect(() => {
    axios.get('http://localhost:3001/user/allusers',{
      headers:{
        'auth-token':JWTtoken
      }
    })
    .then(res=>{
      console.log(res)
      setUsers(res.data)
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

  }, [])

  return (
    <div>
      <Button id="Popover1" type="button">
        Launch Popover
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>{users.map(u=>(
            <>
            <span><Link to={(u._id!==user._id)?"/profile/"+u._id:"/profile"}>{u.name}</Link></span><br></br>
            </>
        ))}</PopoverBody>
      </Popover>
    </div>
  );
}

export default Example;