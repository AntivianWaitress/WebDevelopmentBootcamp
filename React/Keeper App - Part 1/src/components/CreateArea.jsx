import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
    const [newNote, setNewNote] = useState({title: "", content: ""});
    const [isClicked, setIsClicked] = useState(false);

    function handleChange(event){
        const {name, value} = event.target;
        setNewNote(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleSubmit(){
        props.addNote(newNote);
        setNote({
          title: "",
          content: ""
        });
        event.preventDefault();
    }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        {isClicked && <input onChange={handleChange} name="title" placeholder="Title" value={newNote.title} />}
        <textarea onClick={() => {setIsClicked(true)}} onChange={handleChange} name="content" placeholder="Take a note..." value={newNote.content} rows={isClicked ? "3" : "1"} />
        {isClicked && <Zoom in={true}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>}
      </form>
    </div>
  );
}

export default CreateArea;
