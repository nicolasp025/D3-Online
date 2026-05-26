import "./NotepadLayout.css";
import { useNotepad } from "../../contexts/NotepadContext";

const NotepadLayout = () => {
  const { content, setContent } = useNotepad();

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
