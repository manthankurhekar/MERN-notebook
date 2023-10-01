import {React, useEffect} from 'react'
import {Link, useLocation, createBrowserRouter} from 'react-router-dom';

export default function Navbar() {
      let location = useLocation();
      
      // let browserRouter = createBrowserRouter();
      useEffect(() => {
      }, [location]);
      const logout = () => {
            localStorage.removeItem('auth');
            // bs.pushState(null, null, '/login');
      };
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to={localStorage.getItem('auth') ? "/" : "#"} >E-notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to={localStorage.getItem('auth') ? "/" : "#"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to={localStorage.getItem('auth') ? "/about" : "#"}>About</Link>
        </li>
      </ul>

      {

            localStorage.getItem('auth') ? 
            <form className="d-flex">
        <Link className="btn btn-outline-success" to="/login" type="submit" onClick={logout}>Logout</Link>
      </form>
      :
      <form className="d-flex">
        <Link className={`btn btn-outline-success ${location.pathname == '/login' ? 'active' : ''}`} to="/login" type="submit">Login</Link>
        <Link className={`btn btn-outline-success ${location.pathname == '/signup' ? 'active' : ''} mx-2`} to="/signup" type="submit">Sign Up</Link>
      </form>

      }

    </div>
  </div>
</nav>
  )
}
