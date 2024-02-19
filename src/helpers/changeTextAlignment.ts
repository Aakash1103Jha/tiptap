import { Editor } from "@tiptap/react";

export type TextAlignmentOption = "left" | "center" | "right" | "justify";

export default function changeTextAlignment(editor: Editor, alignment: TextAlignmentOption) {
  editor.chain().focus().setTextAlign(alignment).run();
}
