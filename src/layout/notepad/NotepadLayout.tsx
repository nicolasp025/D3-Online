import { useNotepad } from "../../hooks/useNotepad";
import "./NotepadLayout.css";

const NotepadLayout = () => {
  const { content, setContent } = useNotepad();

  return (
    <div className="notepad-wrapper container">
      <h1>Notepad</h1>
      <textarea
        id="notepad"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts here... Your notes are not saved anywhere, so make sure to copy them if you want to keep them!"
      />
    </div>
  );
};

export default NotepadLayout;
