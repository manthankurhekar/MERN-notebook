import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const { notes, addNote, getNotes, editNote } = useContext(noteContext);
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});
  let navigate = useNavigate();
  useEffect(() => {
      if(localStorage.getItem('auth')) {
            getNotes();
      } else {
            navigate("/login");
      }
  }, []); 

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };

  const onClick = (e) => {
      console.log('Updating the note!');
      editNote(note.id, note.etitle, note.edescription, note.etag);
      window.scrollTo(0,0);
      props.showAlert("Note edited Successfully", "success")
      refClose.current.click();
      e.preventDefault();
  };
 
  const onChange = (e) => {
      // fuckyoubitch
      // this was very hard to understand but this is very useful
      setNote({...note, [e.target.name]: e.target.value});
  };

  return (
    <>
      <AddNote showAlert = {props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title 
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange} 
                    value = {note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description 
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange} 
                    value = {note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange} 
                    value = {note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
               ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* note.edescription.length <= 5 ye wala check nahi lagaya abhi tak */}
              <button onClick={onClick} disabled={note.etitle.length <= 3 || note.edescription.length <= 5} type="button" className="btn btn-primary" >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-3 my-1">
        <h1>Your notes</h1>
        <div className="row my-4">
            {notes.length === 0 && <div className="col-md-3 mb-5 mx-1">
                  No Notes to display at the moment!
                  Please add new notes...
              </div>}
          {notes.map((element) => {
            return (
              <div className="col-md-3 mb-5" key={element._id}>
                <NoteItem showAlert = {props.showAlert} note={element} updateNote={updateNote} />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-between"></div>
      </div>
    </>
  );
}
