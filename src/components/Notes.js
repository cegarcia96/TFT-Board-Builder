import React, {useState, useEffect} from 'react';

const Notes = ({ notesText, setNotesText, boardName, setBoardName, handleSubmit }) => {

  return (
    <div className="flex flex-col bg-slate-600 border border-slate-500 w-full">
      <form className="flex flex-col">
        <input className="bg-slate-600 border-b text-center w-3/4 self-center mt-2 mb-2 focus:outline-none text-lg" type="text" placeholder="Board Name" value={boardName} onChange={(event) => setBoardName(event.target.value)}/>
        <textarea className="bg-slate-600 resize-none focus:outline-none px-2"
          cols="48"
          rows="12"
          id="body"
          name="body"
          minLength="50"
          maxLength="1000"
          placeholder="Team Notes"
          spellCheck={false}
          value={notesText}
          onChange={(event) => setNotesText(event.target.value)}
        />
        <input className="bg-slate-600 mt-2 border-t hover:bg-slate-500 cursor-pointer" type="submit" value="Save Board" onClick={(event) => handleSubmit(event)}/>
      </form>
    </div>
  )
};

export default Notes;