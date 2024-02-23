import { ComponentPropsWithRef, memo } from "react";
import { useEditor, EditorContent, BubbleMenu, FloatingMenu, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
// import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Dropcursor from "@tiptap/extension-dropcursor";

import styles from "./editor.module.css";

import MenuBar from "./MenuBar";
import WordCount from "./WordCount";
import { handleFileDrop, handleFilePaste } from "@/helpers/handleFiles";

export type TextEditorPropType = ComponentPropsWithRef<"div"> & {
  id: string;
  htmlContent: string;
  onContentChange: (editor: Editor) => void;
  characterLimit?: number;
  showWordCount?: boolean;
};
export default memo(function TextEditor({
  htmlContent,
  onContentChange,
  id,
  characterLimit,
  showWordCount,
  style,
  className,
}: TextEditorPropType) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: "blockquote",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: styles.listItem,
          },
        },
      }),
      CharacterCount.configure({ limit: characterLimit, mode: "textSize" }),
      TextAlign.configure({
        alignments: ["left", "center", "right", "justify"],
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
      // FontFamily.configure({
      //   types: ["textStyle"],
      // }),
      TextStyle,
      Typography.configure({
        closeDoubleQuote: "”",
        openDoubleQuote: "“",
        closeSingleQuote: "’",
        openSingleQuote: "‘",
        copyright: "©",
        ellipsis: "…",
        emDash: "—",
        trademark: "™",
        leftArrow: "←",
        rightArrow: "→",
        registeredTrademark: "®",
      }),
      Image.configure({
        HTMLAttributes: {
          class: styles.image,
        },
        inline: true,
      }),
      FileHandler.configure({
        onDrop(editor, files, pos) {
          handleFileDrop(editor as Editor, files, pos);
        },
        onPaste(editor, files, pasteContent) {
          handleFilePaste(editor as Editor, files, pasteContent);
        },
      }),
      Placeholder.configure({
        emptyEditorClass: styles.placeholder,
        emptyNodeClass: styles.placeholder,
        placeholder: "Type something...",
      }),
      Dropcursor,
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
    <div className={`${styles.editorContainer} ${className}`} id={id} style={style}>
      {editor ? <MenuBar editor={editor} /> : false}
      <EditorContent editor={editor} className={`${styles.editor}`} />
      {editor && showWordCount ? <WordCount editor={editor} limit={characterLimit} /> : false}
    </div>
  );
});
