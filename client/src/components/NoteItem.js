import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
      const { deleteNote, editNote } = useContext(noteContext);
      const { note, updateNote } = props;
      
  return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">
              {note.description}
            </p>
            <p>
                  <i className="fa-solid fa-trash fa-xl" onClick={() => {
                        deleteNote(note._id)
                        window.scrollTo(0,0);
                        props.showAlert("Note deleted Successfully", "success")
                  }}style={{color: "#ff0000"}}></i>
                  <i className="fa-regular fa-pen-to-square fa-xl mx-2" onClick={() => {
                        updateNote(note)
                  }} style={{color: "#00ff1e"}} ></i>
            </p>
          </div>
        </div>
      </div>
  )
}

