import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    setNotes(prev => [
      ...prev,
      { id: Date.now(), text, date: new Date().toLocaleString() }
    ]);
    setText("");
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        color: "white",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Smart Notes App
      </h1>

      {/* Input Area */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something..."
          style={{
            flex: 1,
            padding: "10px",
            background: "#1E1E1E",
            border: "1px solid #333",
            borderRadius: "5px",
            color: "white"
          }}
        />
        <button
          onClick={addNote}
          style={{
            padding: "10px 20px",
            background: "#4A90E2",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            color: "white"
          }}
        >
          Add
        </button>
      </div>

      {/* Notes Section */}
      <div>
        {notes.map(note => (
          <div
            key={note.id}
            style={{
              background: "#1E1E1E",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "15px",
              border: "1px solid #333",
              transition: "transform .2s",
            }}
          >
            <p>{note.text}</p>
            <small style={{ opacity: 0.7 }}>{note.date}</small>

            <button
              onClick={() => deleteNote(note.id)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                background: "#E24A4A",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                color: "white"
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
