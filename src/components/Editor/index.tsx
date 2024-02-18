import { memo } from "react";
import { useEditor, EditorContent, BubbleMenu, FloatingMenu, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";

import styles from "./editor.module.css";

import MenuBar from "./MenuBar";
import WordCount from "./WordCount";

const limit = 20;

export default memo(function Editor({
  htmlContent,
  onContentChange,
  id,
}: {
  id: string;
  htmlContent: string;
  onContentChange: (editor: Editor) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: "blockquote",
          },
        },
      }),
      CharacterCount.configure({ limit, mode: "textSize" }),
    ],
    editorProps: {
      attributes: {
        spellcheck: "true",
      },
    },
    parseOptions: {
      preserveWhitespace: "full",
    },
    content: htmlContent,
    onUpdate: ({ editor }) => {
      onContentChange(editor as Editor);
    },
  });

  return (
    <div className={`${styles.editorContainer}`} id={id}>
      {editor ? <MenuBar editor={editor} /> : false}
      <EditorContent editor={editor} className={`${styles.editor}`} />
      {editor ? <WordCount editor={editor} limit={limit} /> : false}
    </div>
    // <div
    //   style={{
    //     border: "1px solid #eee",
    //     borderRadius: "0.3rem",
    //     maxWidth: "40rem",
    //     width: "100%",
    //     margin: "0 auto",
    //   }}
    // >
    //   {!editor ? false : <Bubble editor={editor} />}
    //   {!editor ? false : <Floating editor={editor} />}
    //   <EditorContent editor={editor} style={{ padding: "1rem" }} />
    //   {!editor ? false : <CharacterCounter editor={editor} />}
    // </div>
  );
});
function Bubble({ editor }: { editor: Editor }) {
  return (
    <BubbleMenu editor={editor} updateDelay={0} className="editorMenu">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "active" : ""}
      >
        <i className="bi bi-type-bold"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <i className="bi bi-type-italic"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "active" : ""}
      >
        <i className="bi bi-type-strikethrough"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
      >
        <i className="bi bi-type-h1"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
      >
        <i className="bi bi-type-h2"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
      >
        <i className="bi bi-type-h3"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "active" : ""}
      >
        <i className="bi bi-quote"></i>
      </button>
    </BubbleMenu>
  );
}
function Floating({ editor }: { editor: Editor }) {
  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }} className="editorMenu floating">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
      >
        <i className="bi bi-type-h1"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
      >
        <i className="bi bi-type-h2"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
      >
        <i className="bi bi-type-h3"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "active" : ""}
      >
        <i className="bi bi-quote"></i>
      </button>
    </FloatingMenu>
  );
}
