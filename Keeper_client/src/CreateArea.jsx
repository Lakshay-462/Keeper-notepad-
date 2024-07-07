import { useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
// import AddIcon from "@mui/icons-material";
import Fab from "@mui/material/Fab";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [expanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prv) => {
      return { ...prv, [name]: value };
    });
  }

  function expand() {
    return setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {expanded && (
          <input
            autoFocus
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={note.title}
          />
        )}
        <textarea
          onClick={expand}
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows={expanded ? 3 : 1}
          value={note.content}
        />
        <Zoom in={expanded && true}> 
          <Fab
            onClick={(event) => {
              event.preventDefault();
              // eslint-disable-next-line react/prop-types
              props.addNote(note);
              setNote({
                title: "",
                content: "",
                row_count: 1,
              });
            }}
          >
            <NoteAddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
