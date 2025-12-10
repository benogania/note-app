import { useState } from "react";
import axios from "axios";


const NotesSection = ({ notes, fetch, onNoteClick }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      if (fetch) fetch();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    
    <div className="w-full max-w-[] my-5 columns-1 sm:columns-2 md:columns-3 xl:columns-5 gap-4 px-16">
      {notes.map((note) => (
        <div key={note._id} className="p">
          <div
            onMouseEnter={() => setHoveredId(note._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onNoteClick(note)}
            className="break-inside-avoid  mb-3 w-[220px] border-[0.5px] border-gray-200 text-gray-600 rounded-md px-3 pt-4 pb-3 hover:shadow-sm hover:text-gray-700 cursor-pointer break-words whitespace-normal"
          >
            <h2 className="text-xl  font-semibold">{note.title}</h2>
            <p className="text-wrap">{note.content}</p>

            <div className="h-7 w-full flex items-center justify-end mt-2 ">
              {hoveredId === note._id && (
                <div className="flex gap-3 items-center text-gray-500">
                  <i class="bi bi-archive"></i>
                  <i className="bi bi-pin-angle text-lg hover:text-green-700"></i>
                  <i
                    className="bi bi-trash3 hover:text-red-500 cursor-pointer"
                    onClick={() => handleDelete(note._id)}
                  ></i>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesSection;
