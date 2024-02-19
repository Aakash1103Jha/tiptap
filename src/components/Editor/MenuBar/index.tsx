import { ComponentPropsWithRef, memo } from "react";
import { Editor } from "@tiptap/react";

import styles from "./menuBar.module.css";

import MenuButton from "./MenuButton";
import MenuDropdown from "./MenuDropdown";

import HeadingLevels from "@/config/headingLevels.json";
import FontFamily from "@/config/fontFamily.json";
import TextAlignment from "@/config/textAlignment.json";
import changeHeadingLevel from "@/helpers/changeHeadingLevel";
import changeFontFamily from "@/helpers/changeFontFamily";
import changeTextAlignment, { TextAlignmentOption } from "@/helpers/changeTextAlignment";
import { handleImageSelection } from "@/helpers/handleFiles";

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
      <ButtonGroup id="fonts">
        <MenuDropdown onChange={(e) => changeFontFamily(editor, e)} options={FontFamily} id="font-family" />
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
        <MenuButton
          title="Blockquote"
          id="blockquote"
          biName="quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
      </ButtonGroup>
      <ButtonGroup id="heading-levels">
        <MenuDropdown onChange={(e) => changeHeadingLevel(editor, e)} options={HeadingLevels} id="headings" />
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
        {TextAlignment.map(({ biName, id, title }) => (
          <MenuButton
            key={id}
            id={id}
            title={title}
            onClick={() => changeTextAlignment(editor, id as TextAlignmentOption)}
            biName={biName}
          />
        ))}
      </ButtonGroup>
      <ButtonGroup id="media">
        <span>
          <MenuButton biName="image" onClick={() => handleImageSelection(editor, "insert-image")} />
          <input hidden type="file" id="insert-image" />
        </span>
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
