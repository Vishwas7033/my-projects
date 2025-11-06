import React, { useState } from "react";

export default function Employee() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Alice", designation: "Developer" },
    { id: 2, name: "Bob", designation: "Designer" },
    { id: 3, name: "Charlie", designation: "Manager" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  const handleRenameClick = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const handleSave = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, name: newName } : emp
      )
    );
    setEditingId(null);
  };

  return (
    <div className="container">
      <h2>Employee List</h2>
      {employees.map((emp) => (
        <div key={emp.id} className="employee-card">
          {editingId === emp.id ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button className="save-btn" onClick={() => handleSave(emp.id)}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>
                {emp.name} ({emp.designation})
              </span>
              <button
                className="delete-btn"
                onClick={() => handleRenameClick(emp.id, emp.name)}
              >
                Rename
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}