import React from "react";
import axios from "axios";


const Nav = ({setNote,refetch }) => {
  const searchHandler = (e) => {
    const value = e.target.value;
    if (!value) {
      refetch();
      return;
    }
    axios
      .get(`http://localhost:5000/notes/search?q=${value}`)
      .then((res) => {
        console.log(res.data);
        setNote(res.data);
      })
      .catch((err) => {
        console.error("Error searching notes:", err);
      });
  };

  
  return (
    <nav className="w-full h-16 bg-amber-400 px-12 flex items-center justify-between">
      <div className="hidden md:flex text-2xl text-gray-700">.Note</div>

      <div className="flex justify-center items-center gap-7">
        <div className="w-[80%]  md:w-[500px] h-10 bg-white rounded-sm">
          <input
            onChange={searchHandler}
            type="text"
            placeholder="Search your notes..."
            className="w-full h-full rounded-4xl px-5 outline-0 border-none"
          />
        </div>
      </div>
      <div></div>
    </nav>
  );
};

export default Nav;
