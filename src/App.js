import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import About from "./components/About";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import NotesState from "./context/notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/alert/AlertState";

function App() {
  return (
    <>
    <AlertState>
    <NotesState>
      <Router>
        <Navbar
        />
        <Alert />
        <div className="container my-3">
          <Routes>
            <Route exact path="/"
              element={<Home/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
          </Routes>
        </div>
      </Router>
      </NotesState>
      </AlertState>
    </>
  );
}

export default App;
