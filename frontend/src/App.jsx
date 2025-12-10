import Nav from "./components/Nav";
import NoteForm from "./components/NoteForm";
import NotesSection from "./components/NotesSection";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdateForm from "./components/UpdateForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="w-full">
      <Nav setNote={setNotes} refetch={fetchNotes}/>
      <NoteForm fetch={fetchNotes} />
      <NotesSection
        notes={notes}
        fetch={fetchNotes}
        onNoteClick={setSelectedNote}
      />
      {selectedNote && (
        <UpdateForm
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          fetch={fetchNotes}
        />
      )}
    </div>
  );
};

export default App;
