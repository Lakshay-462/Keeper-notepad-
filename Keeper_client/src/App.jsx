import { useState, useEffect } from 'react';
import './App.css';
import CreateArea from "./CreateArea.jsx";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Note from './Note.jsx';
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);


  const URL = "http://localhost:3000"

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await axios.get(`${URL}`);
        const noteInfo = response.data.rows;
        const newNotes = noteInfo.map(noteSingle => ({
          id:noteSingle.id,
          title: noteSingle.title,
          content: noteSingle.content
        }));
        setNotes(newNotes);
        console.log(`this is note info: ${JSON.stringify(noteInfo)}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  function addNote(newNote) {
    async function addNoteDB(){
      try{
        const response = await axios.post(`${URL}/add`, newNote);
        setNotes(prev => [...prev,{
          id : response.data.id,
          title : newNote.title,
          content : newNote.content,
        }]);
        console.log(response);
      }catch(error){
        console.error(error);
      }
    }
    if(newNote.title != "" && newNote.content != ""){
      addNoteDB();
    }
  }

  function deleteNote(id) {
    async function deleteNoteDB(){
      try{
        const response = await axios.post(`${URL}/delete`, {id});
        setNotes(prev => prev.filter((note) => note.id !== id));
        console.log(response);
      }catch(error){
        console.error(error);
      }
    }
    deleteNoteDB();
    
  }

  return (
    <>
      <Header />
      <CreateArea addNote={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          title={noteItem.title}
          content={noteItem.content}
          id = {noteItem.id}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </>
  );
}

export default App;



// 
