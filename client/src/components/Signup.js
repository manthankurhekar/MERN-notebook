import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Signup(props) {

      const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
      let navigate = useNavigate();
      const onSubmit = async (e) => {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();
            console.log(json);
            if(json.success == true) {
                  localStorage.setItem('auth', json.authToken);
                  navigate("/");
                  // swal("Hurray!", `Account created Successfully`, "success");
                  props.showAlert("Accounted Created Successfully!", "success");
            } else {
                  swal("Error!", `${json.err}`, "error");
            }
      };

      const onchange = (e) => {
            setCredentials({...credentials, [e.target.name]: e.target.value});
            console.log(credentials.email, credentials.password);
      };

  return (
      <div className="container">
      <form onSubmit={onSubmit}>
       <div className="form-group">
          <label htmlFor="exampleInputPassword2">Name</label>
          {/* ikde value dyachi garaj ahe ka kharach? */}
          <input type="text" className="form-control my-2" id="name" value={credentials.name} name="name" onChange={onchange} placeholder="Name"/>
        </div>

        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          {/* value dyachi garaj ahe ka kharach? */}
          <input type="email" className="form-control my-2" name="email" value={credentials.email} id="email" aria-describedby="emailHelp" 
          onChange={onchange}
          placeholder="Email"/>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          {/* ikde value dyachi garaj ahe ka kharach? */}
          <input type="password" className="form-control my-2" id="password" value={credentials.password} name="password" onChange={onchange} placeholder="Password"/>
        </div>

        <button type="submit" className="btn btn-primary my-2" onClick={onSubmit}>Register</button>
      </form>
          </div>
  )
}
