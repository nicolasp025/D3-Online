import { useState } from "react";
import "./NotepadLayout.css";

const NotepadLayout = () => {
  const [content, setContent] = useState<string>("");
  return (
    <div className="container">
      <textarea
        id="notepad"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts here ..."
      />
    </div>
  );
};

export default NotepadLayout;
