import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  function handleClick() {
    // eslint-disable-next-line react/prop-types
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      {/* eslint-disable-next-line react/prop-types */}
      <h1>{props.title}</h1>
      {/* eslint-disable-next-line react/prop-types */}
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
