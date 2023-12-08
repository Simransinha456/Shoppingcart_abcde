import React from 'react'
import{Link} from 'react-router-dom'
import{useCookies} from 'react-cookie'

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  return (
    <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        <Link to="/saved-recipe">Saved Recipe</Link>
        {!cookies.access_token ? (<Link to="/auth">Login/Register</Link>):<button>Logout</button>}
        </div>
  )
}

export default Navbar