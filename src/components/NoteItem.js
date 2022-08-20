import React,{useContext} from "react";
import alertContext from "../context/alert/AlertContext";
import notesContext from "../context/notes/NotesContext";

export default function NoteItem(props) {
  const { note, updateNote} = props;
  const context = useContext(notesContext);
  const {deleteNote} = context;
  const contextAlert = useContext(alertContext);
  const { showAlert } = contextAlert;

  
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title">{note.title}</h5>
            <i className="mx-1 fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
            <i className="mx-1 far fa-trash-alt" onClick={()=>{deleteNote(note._id); showAlert("Success","Deleted Successfully.","success")}} ></i>
          </div>
          <p className="card-text">{note.description}</p>
          <p className="text-small text-muted">{note.tag}</p> 
        </div>
      </div>
    </div>
  );
}
