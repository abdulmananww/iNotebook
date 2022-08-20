import React, { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props) => {
  const host = "http://localhost:3002";
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  const addNote = async (note) => {
    console.log(note);
    const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("token"),
        },
        body:JSON.stringify(note)
      });
      const json = await response.json();
      if(json)
        setNotes(notes.concat(json));
  };
  const editNote = async (note) => {
    console.log(note);
    const response = await fetch(`${host}/api/notes/updateNote/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("token"),
        },
        body:JSON.stringify(note)
      });
      const json = await response.json();
      if(json){
        setNotes(notes.map(el => (el._id === note._id ? Object.assign(el, note) : el)))
      }
  };
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if(json){
    const newNote = await notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
}
  };
  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, getNotes,editNote }}>
      {props.children}
    </NotesContext.Provider>
  );
};
export default NotesState;
