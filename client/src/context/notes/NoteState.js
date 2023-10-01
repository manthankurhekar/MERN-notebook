import { createContext } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          `${localStorage.getItem('auth')}`,
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": `${localStorage.getItem('auth')}`
        },
        body: JSON.stringify({title, description, tag})
      });
  
      const note = await response.json();
      console.log(note);
      setNotes(notes.concat(note))
    };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          `${localStorage.getItem('auth')}`,
      },
    });

    const json = await response.json();
    console.log(json);

    // fuckyoubitch api call krna baki h
    console.log("Deleting note with id ", id);
    const newNotes = notes.filter((note) => {
      return note._id != id;
    });
    setNotes(newNotes);
  };

  // Update a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          `${localStorage.getItem('auth')}`,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    for(let ind = 0; ind < newNotes.length; ind++) {
      const element = newNotes[ind];
      if(element._id == id) {
            newNotes[ind].title = title;
            newNotes[ind].description = description;
            newNotes[ind].tag = tag;
            break;
      }
    }

    setNotes(newNotes);

  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
