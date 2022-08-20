import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import Notes from "./Notes";

export default function Home() {
  let navigate = useNavigate();
  useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/login");  
    };
  }, []);
  return (
    <div>
      <AddNote />
      <Notes />
    </div>
  );
}
