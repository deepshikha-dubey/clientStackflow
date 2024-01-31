import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
//import decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

import logo from '../../assets/logo-stackoverflow.png'
import search from '../../assets/search.svg'
import Avtar from '../../components/Avtar/Avtar'
import './Navbar.css'
import { setCurrentUser } from "../../actions/currentUser";

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
    var User = useSelector ((state) => (state.currentUserReducer) )
    const handleLogout = () => {
      dispatch({type: 'LOGOUT'});
      navigate('/')
      dispatch(setCurrentUser(null))
    }   

    useEffect(() => {
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    }, [dispatch]);
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        // handle token expiration
      }
    }
    
    return(
  <nav className="main-nav">
    <div className="navbar">
         
          <Link to ='/' className='nav-item nav-btn nav-logo'> 
          <img src={ logo } alt='logo' width=""/>
          </Link>
        <Link to='/' className='nav-item nav-btn'>About</Link>
        <Link to='/' className='nav-item nav-btn'>Products</Link>
        <Link to='/' className='nav-item nav-btn'>For Teams</Link>
       <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="Search" width="18" className="search-icon"/>
       </form>
       { User === null ? 
    
    <Link to='/Auth' className='nav-item nav-link'> Log in</Link>:
    <>
   <Avtar className="avtar" backgroundColor="#009dff" px="10px" py="7px" borderRadius="50%" color="white"><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avtar>
     <button className="nav-item nav-link" onClick={handleLogout}>Log Out</button>
    </>   
       }
    </div>
  </nav>
    )
}

export default Navbar