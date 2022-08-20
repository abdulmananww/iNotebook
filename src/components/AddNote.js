import React,{useContext,useState} from "react";
import alertContext from "../context/alert/AlertContext";
import notesContext from "../context/notes/NotesContext";

export default function AddNote() {
    const contextAlert = useContext(alertContext);
  const {showAlert} = contextAlert

    const context = useContext(notesContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""});
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note)
        setNote({title:"",description:"",tag:""});
        showAlert("Success","Added new note.","success")

    }
    const handleOnChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container">
        <h2>Add Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={handleOnChange}
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
              onChange={handleOnChange}
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
              onChange={handleOnChange}
            />
          </div>
          <button type="submit" disabled={note.title.length<5 || note.description.length<5 || note.tag.length<5} onClick={handleClick} className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
