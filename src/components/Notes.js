import React, {useState, useEffect} from 'react';

const Notes = ({ notesText, setNotesText, boardName, setBoardName, handleSubmit, loadBoard }) => {

  return (
    <div className="text-container">
      <button onClick={() => loadBoard()}>Load Board</button>
      <form className="text-container">
        <input type="text" placeholder="Board Name" value={boardName} onChange={(event) => setBoardName(event.target.value)}/>
        <textarea
          cols="48"
          rows="12"
          id="body"
          name="body"
          minLength="50"
          maxLength="1000"
          placeholder="Team Notes"
          value={notesText}
          onChange={(event) => setNotesText(event.target.value)}
        />
        <input type="submit" value="Save Board" onClick={(event) => handleSubmit(event)}/>
      </form>
    </div>
  )
};

export default Notes;