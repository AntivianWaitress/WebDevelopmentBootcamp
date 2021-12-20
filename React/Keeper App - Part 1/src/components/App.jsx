import React, { useState } from "react";
import Header from "./Header";
import CreateArea from "./CreateArea";
import Footer from "./Footer";
import Note from "./Note";
import {v4 as uuidv4} from "uuid";


function App(){
    const [notes, setNotes] = useState([]);

    function addNote(newNote){
        newNote.key = notes.length + 1;
        newNote.id = uuidv4();
        setNotes(prevValues => {
            return [...prevValues, newNote];
        });        
    }

    function deleteNote(deletedId){
        setNotes(prevValues => {
            return prevValues.filter((note) => { return note.id !== deletedId})
        })
    };

    return  <div>
                <Header />
                <CreateArea addNote={addNote} />
                {notes.map(note => 
                    <Note key={note.key} id={note.id} title={note.title} content={note.content} deleteNote={deleteNote} />
                )}
                <Footer />
            </div>
    ;
};



export default App;