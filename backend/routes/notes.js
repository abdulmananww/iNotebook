const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Add new note - Login required
router.post(
    "/addNote",
    fetchuser,
    [
    body("title", "Enter title").isLength({ min: 5 }),
    body("description","Enter description").isLength({ min: 5 })
],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        let {title,description,tag} = req.body;
        data = {
            title:title,
            description:description,
            tag:tag,
            user:req.user.id
        }
        notes = await Notes.create(data)
        res.json(notes)
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong in Notes");
      }
    }
  );
  
// ROUTE 2: Fetch all notes - Login required
router.get(
  "/fetchAllNotes",
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let notes = await Notes.find({ user: req.user.id });
      res.json(notes)
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong in Notes");
    }
  }
);
// ROUTE 3: Update note - Login required
router.put(
    "/updateNote/:id",
    fetchuser,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const {title,description,tag} = req.body
        let newNote = {};
        if(title){ newNote.title = title; }
        if(description){ newNote.description = description; }
        if(tag){ newNote.tag = tag; }
        let oldNote = await Notes.findById(req.params.id)
        if(!oldNote){
            res.status(404).send("Not found")
        }
        if(oldNote.user.toString() !== req.user.id){
            res.status(401).send("Not allowed")    
        }
        let note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note})
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong in Notes");
      }
    }
  );
  // ROUTE 4: Delete note - Login required
router.delete(
    "/deleteNote/:id",
    fetchuser,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        let oldNote = await Notes.findById(req.params.id)
        if(!oldNote){
            return res.status(404).send("Not found")
        }
        if(oldNote.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")    
        }
        let note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"Note deleted successfully",note:note})
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong in Notes");
      }
    }
  );
module.exports = router