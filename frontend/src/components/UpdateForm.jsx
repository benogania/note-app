import { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = ({ note, onClose, fetch }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await axios.put(`http://localhost:5000/notes/${note._id}`, {
        title,
        content,
      });
      if (fetch) fetch();
      onClose();
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="w-full h-full bg-black fixed z-[-2] opacity-30"></div>
      <div className="border-[0.5px] border-gray-50 flex flex-col rounded-md h-fit p-5 w-[500px] shadow bg-white">
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
          className="outline-0 h-80  mt-3"
          placeholder="Edit your Note...."
        />

        <div className="flex gap-4 text-3xl w-full justify-end items-center pt-4">
          <i
            onClick={onClose}
            className="bi bi-x cursor-pointer hover:text-red-700"
          ></i>
          <i
            onClick={handleSubmit}
            className="bi bi-check cursor-pointer hover:text-green-700"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
