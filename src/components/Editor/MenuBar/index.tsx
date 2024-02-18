import { ComponentPropsWithRef, memo } from "react";
import { Editor } from "@tiptap/react";

import styles from "./menuBar.module.css";

import MenuButton from "./MenuButton";
import MenuDropdown from "./MenuDropdown";

export default memo(function MenuBar({ editor }: { editor: Editor }) {
  function onFontFamilyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    editor.chain().focus().setFontFamily(event.target.value).run();
  }
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
      <ButtonGroup id="fonts">
        <MenuDropdown
          onChange={onFontFamilyChange}
          options={[
            { id: "poppins", label: "Poppins", value: "Poppins" },
            { id: "arial", label: "Arial", value: "Arial" },
            { id: "tnr", label: "Times New Roman", value: "Times New Roman" },
            { id: "cn", label: "Courier New", value: "Courier New" },
            { id: "georgia", label: "Georgia", value: "Georgia" },
            { id: "verdana", label: "Verdana", value: "Verdana" },
          ]}
          id="font-family"
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
        <MenuButton
          title="Paragraph"
          id="p"
          biName="paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
        />
      </ButtonGroup>
      <ButtonGroup id="lists">
        <MenuButton
          title="Numbered List"
          id="list-ol"
          biName="list-ol"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <MenuButton
          title="Bullet List"
          id="list-ul"
          biName="list-ul"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
      </ButtonGroup>
      <ButtonGroup id="text-align">
        <MenuButton
          title="Align Left"
          id="justify-left"
          biName="text-left"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />
        <MenuButton
          title="Align Center"
          id="justify-center"
          biName="text-center"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />
        <MenuButton
          title="Align Right"
          id="justify-right"
          biName="text-right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />
        <MenuButton
          title="Justify"
          id="justify-text"
          biName="justify"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
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
