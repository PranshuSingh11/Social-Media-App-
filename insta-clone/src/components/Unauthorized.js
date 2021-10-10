import React from 'react'
import { Link } from 'react-router-dom'

function Unauthorized() {
    return (
        <div>
            Unauthorized
            <Link to='/'> Home </Link>
        </div>
    )
}

export default Unauthorized
