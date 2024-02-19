import { Editor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";
import { ChangeEvent } from "react";

export default function changeHeadingLevel(editor: Editor, e: ChangeEvent<HTMLSelectElement>) {
  const { value } = e.target;
  if (value === "0") return editor.chain().focus().setParagraph().run();
  return editor
    .chain()
    .focus()
    .toggleHeading({ level: parseInt(value) as Level })
    .run();
}
