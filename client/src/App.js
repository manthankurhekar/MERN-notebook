import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";

function App() {
      const [alert, setAlert] = useState(null);
      const showAlert = (message, type)=>{
            setAlert({
              msg: message,
              type: type
            })
            setTimeout(() => {
                setAlert(null);
            }, 1500);
        }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container my-3" >
            <Routes>
                  <Route exact path="/" element={<Home key="home" showAlert={showAlert} />} />
                  <Route path="/about" element={<About key="about" showAlert={showAlert} />} />
                  <Route path="/login" element={<Login showAlert={showAlert}  />} />
                  <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
