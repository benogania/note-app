
import { useState } from "react";
import axios from "axios";

const NoteForm = ({fetch}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title & !content) return;

    try {
      await axios.post("http://localhost:5000/notes/api", { title, content });
      setTitle("");
      setContent("");
      if (fetch) fetch();
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-10 ">
      <div className="border-[0.5px] border-gray-50 flex flex-col rounded-2xl p-5 h-fit w-60 md:w-[500px] shadow">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          className="text-xl font-semibold border-none outline-0"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="outline-0 h-[60px]"
          type="text"
          draggable
          placeholder="Start your Note...."
        />

        <div className="flex gap-4 text-3xl w-full h-5 justify-end items-center pt-2">
          <i
            onClick={handleSubmit}
            className="bi bi-check text-gray-500 cursor-pointer"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
