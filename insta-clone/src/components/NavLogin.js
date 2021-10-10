import axios from "axios";
import React,{useState,useEffect} from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {useHistory,Link, NavLink} from 'react-router-dom'
import logo from '../assets/images/Logo.png'
import { Button, Popover, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';

function NavLogin() {
  let history = useHistory()
  const logout = () =>{
    localStorage.removeItem('JWTtoken')
    localStorage.removeItem('UserEmail')
    localStorage.removeItem('UserName')
    history.push('/login')
}

const [popoverOpen, setPopoverOpen] = useState(false);
const [users,setUsers] = useState([])
const [user,setUser] = useState({})
const [search,setSearch] = useState('')
const [searchres,setSearchres] = useState('')

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


const getSearch = (e) => {
  setSearch(e.target.value)
  const filtered = users.filter(user=>{
    return user.name.toLowerCase().includes(search.toLowerCase())
  })
  setSearchres(filtered)
}


  return (
    <div>
      <Navbar bg="light">
        <span style={{fontSize:"20px",fontFamily:"'Anton', sans-serif"}}>PHOTOGRAM</span>
        <Nav className="mr-auto">
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <Link to="/create-post">
              <NavDropdown.Item href="#action/3.1">
                Create Post
              </NavDropdown.Item>
            </Link>
            <Link to="/post">
              <NavDropdown.Item href="#action/3.2">Posts Feed</NavDropdown.Item>
            </Link>
            <Link to="/profile">
              <NavDropdown.Item href="#action/3.3"> Your Profile</NavDropdown.Item>
            </Link>
            <NavDropdown.Divider />
            <Link>
              <NavDropdown.Item href="#action/3.3" onClick={logout}>Logout</NavDropdown.Item>
            </Link>
          </NavDropdown>
        
          <input value={search} autocomplete="off" placeholder="Search" style={{textAlign:"center",borderRadius:"7px",outline:"none",height:"30px",marginTop:"5px",border:"2px solid lightgrey"}} id="PopoverFocus" type="text" onChange={getSearch}></input>
      <UncontrolledPopover className="popover" trigger="focus" placement="bottom" target="PopoverFocus">
        <PopoverHeader>Search People</PopoverHeader>
        <PopoverBody className="popoverbody">
          
            {
              (searchres)?
              <>
              {
                searchres.map(res=>(
                  <> <Link to={(res._id!==user._id)?"/profile/"+res._id:"/profile"}><span  style={{textDecoration:"none",color:'black',textAlign:"center"}}>{res.name}</span></Link><hr></hr> </>
                ))
              }
              </>:
              <></>
            }
        </PopoverBody>
      </UncontrolledPopover>
        
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavLogin;
