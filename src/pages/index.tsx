import TextEditor from "@/components/Editor";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  function onUpdate(editor: Editor) {
    setContent(editor.getHTML());
  }
  return (
    <main style={{ padding: "1rem", display: "flex" }}>
      <TextEditor style={{ flex: 1 }} id="main" htmlContent={content} onContentChange={onUpdate} showWordCount />
      <div className="output" dangerouslySetInnerHTML={{ __html: content }} style={{ flex: 1 }} />
    </main>
  );
}
