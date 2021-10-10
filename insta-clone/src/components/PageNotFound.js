import React from 'react'
import image from '../assets/images/404.jpeg'
import { useHistory } from "react-router";

function PageNotFound() {
    const JWTtoken = localStorage.getItem('JWTtoken')
    let history = useHistory()
    const redirect = () => {
        if(JWTtoken)
            history.push('/profile')
        else
            history.push('/')
    }
    return (
        <div>
            <div className="fluid-container" style={{height:"100vh"}}>
                <div className="row"  style={{height:"100vh"}}>
                <div className="col-md-8">
                        <div id="notfoundText">
                        <b className="notfoundTitle" style={{fontSize:"50px",fontFamily:"'Anton', sans-serif"}}>AWWW...DON’T CRY.</b><br></br><br></br>
                        <span style={{fontSize:"20px",fontFamily:"'Anton', sans-serif"}}>It's just a <span style={{color:"#F50057"}}>404</span> Error!</span> <br></br><br></br>
                        <span style={{fontSize:"20px",fontFamily:"'Anton', sans-serif"}}>What you’re looking for may have been misplaced in Long Term Memory.</span><br></br><br></br>
                        <button onClick={redirect} className="btn btn-primary" style={{fontSize:"20px",fontFamily:"'Concert One', cursive"}}>HOME</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img src={image} id="notfoundImg"></img>
                    </div>
            
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
