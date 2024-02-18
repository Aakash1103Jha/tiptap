import { ComponentPropsWithRef, memo } from "react";
import { Editor } from "@tiptap/react";

import styles from "./menuBar.module.css";

import MenuButton from "./MenuButton";

export default memo(function MenuBar({ editor }: { editor: Editor }) {
  return (
    <header className={`${styles.editorMenuBar}`}>
      <ButtonGroup id="undo-redo">
        <MenuButton
          label="Undo"
          id="undo"
          biName="arrow-counterclockwise"
          onClick={() => editor.chain().focus().undo().run()}
        />
        <MenuButton
          label="Redo"
          id="redo"
          biName="arrow-clockwise"
          onClick={() => editor.chain().focus().redo().run()}
        />
      </ButtonGroup>
      <ButtonGroup id="b-i-u-s">
        <MenuButton
          title="Bold"
          id="bold"
          biName="type-bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <MenuButton
          title="Italic"
          id="italic"
          biName="type-italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <MenuButton
          title="Strikethrough"
          id="strikethrough"
          biName="type-strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
      </ButtonGroup>
      <ButtonGroup id="heading-levels">
        <MenuButton
          title="Heading 1"
          id="h1"
          biName="type-h1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        />
        <MenuButton
          title="Heading 2"
          id="h2"
          biName="type-h2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <MenuButton
          title="Heading 3"
          id="h3"
          biName="type-h3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
      </ButtonGroup>
    </header>
  );
});

function ButtonGroup({ children, id }: ComponentPropsWithRef<"div">) {
  return (
    <div id={id} className={`${styles.editorMenuBarButtonGroup}`}>
      {children}
    </div>
  );
}
