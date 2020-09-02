import React, { useState } from "react";

export default function AddNode({ addNode }) {
  let [name, setName] = useState("some file.html");
  let [type, setType] = useState("file");

  let handleNameChange = (event) => {
    setName(event.target.value);
  };

  let handleTypeChange = (event) => {
    setType(event.target.value);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    addNode(name, type);
  };

  return (
    <form className="form-inline">
      <input
        type="text"
        className="form-control mr-sm-2 form-control-sm"
        id="inlineFormInputName2"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />

      <select className="mr-2 form-control-sm" onChange={handleTypeChange}>
        <option value="file">File</option>
        <option value="folder">Folder</option>
      </select>

      <button
        type="submit"
        className="btn btn-success btn-sm"
        onClick={handleSubmit}
      >
        Add Node
      </button>
    </form>
  );
}
