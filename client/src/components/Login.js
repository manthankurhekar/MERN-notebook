import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Login(props) {

      const [credentials, setCredentials] = useState({email: "", password: ""});
      let navigate = useNavigate();
      const onSubmit = async (e) => {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();
            console.log(json);
            if(json.success == true) {
                  localStorage.setItem('auth', json.authToken);
                  navigate("/");
                  // swal("Hurray!", `Logged in Successfully`, "success");
                  props.showAlert("Logged in Successfully!", "success");
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
<form >
  <div className="form-group my-2">
    <label htmlFor="exampleInputEmail1">Email address</label>
    {/* value dyachi garaj ahe ka kharach? */}
    <input type="email" className="form-control my-2" name="email" value={credentials.email} id="email" aria-describedby="emailHelp" 
    onChange={onchange}
    placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    {/* ikde value dyachi garaj ahe ka kharach? */}
    <input type="password" className="form-control my-2" id="password" value={credentials.password} name="password" onChange={onchange} placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary my-2" onClick={onSubmit}>Login</button>
</form>
    </div>
  );
}
