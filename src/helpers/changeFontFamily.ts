import { Editor } from "@tiptap/react";
import { ChangeEvent } from "react";

export default function changeFontFamily(editor: Editor, e: ChangeEvent<HTMLSelectElement>) {
  editor.chain().focus().setFontFamily(e.target.value).run();
}
