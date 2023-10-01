import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

export default function AddNote(props) {
  const { addNote, editNote } = useContext(noteContext);
  const [greet, setGreet] = useState("");
      const [note, setNote] = useState({title: "", description: "", tag: ""});
      const fetchUesr = async () => {
            const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
                  method: "GET",
                  headers: {
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem('auth')}`,
                  },
            });
            const json = await response.json();
            setGreet(`${json.name}`);
      } 
      useEffect( () => {
            fetchUesr();
      }, []);
      
  const onClick = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      window.scrollTo(0,0);
      props.showAlert("Note added Successfully!", "success");
      setNote({title: "", description: "", tag: ""});
  };
 
  const onChange = (e) => {
      // fuckyoubitch
      // this was very hard to understand but this is very useful
      setNote({...note, [e.target.name]: e.target.value});
  };


  return (
    <div>
      <div className="container">
        <h1>{`Welcome, ${greet}`}&nbsp;</h1>
        <h1>Add a note...</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title 
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title" 
              value={note.title}
              aria-describedby="emailHelp" onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description 
            </label>
            <input
              type="text"
              className="form-control"
              id="description" 
              name="description" 
              value={note.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag" 
              name="tag" 
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button disabled={note.title.length <= 3 || note.description.length <= 5} type="submit" className="btn btn-primary" onClick = {onClick}>
            Add note
          </button>
        </form>
      </div>
    </div>
  );
}
