import PropTypes from "prop-types";
import React from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom';


export default function Navbar(props) {
    let location = useLocation();
    let navigate = useNavigate();
    const handleClick = ()=>{
      localStorage.removeItem("token")
      navigate("/login")
    }
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {localStorage.getItem("token")?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>:<ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>}
            {!localStorage.getItem("token")?<div><Link className="btn btn-primary mx-1" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary mx-1" to="/signup">
              Signup
            </Link></div>:<button  onClick={handleClick} className="btn btn-primary">Logout</button>}
        </div>
      </div>
    </nav>
  );
}
Navbar.propTypes = { title: PropTypes.string };
Navbar.defaultProps = { title: "iNotebook" };
