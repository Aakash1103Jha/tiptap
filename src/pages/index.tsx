import TextEditor from "@/components/Editor";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  function onUpdate(editor: Editor) {
    setContent(editor.getHTML());
  }
  return (
    <main style={{ padding: "1rem" }}>
      <TextEditor id="main" htmlContent={content} onContentChange={onUpdate} showWordCount />
      <div className="output" dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
