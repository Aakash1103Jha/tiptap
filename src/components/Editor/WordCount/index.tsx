import { Editor } from "@tiptap/react";
import { memo, useCallback, useEffect, useState } from "react";

import styles from "./wordCount.module.css";

export default memo(function CharacterCounter({ editor, limit }: { editor: Editor; limit?: number }) {
  const [wordsCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [shouldWarn, setShouldWarn] = useState(false);

  const updateWordCount = useCallback(() => {
    setWordCount(editor.storage.characterCount.words());
  }, [editor]);

  const updateCharCount = useCallback(() => {
    setCharCount(editor.storage.characterCount.characters());
  }, [editor]);

  const updateShouldWarn = useCallback(() => {
    if (limit) {
      setShouldWarn(editor.storage.characterCount.characters() > 0.8 * limit);
    }
  }, [editor, limit]);

  useEffect(() => {
    editor.on("transaction", updateWordCount);
    return () => {
      editor.off("transaction", updateWordCount);
    };
  }, [updateWordCount, editor]);

  useEffect(() => {
    editor.on("transaction", updateCharCount);
    editor.on("transaction", updateShouldWarn);
    return () => {
      editor.off("transaction", updateCharCount);
      editor.off("transaction", updateShouldWarn);
    };
  }, [updateCharCount, updateShouldWarn, editor]);

  return (
    <div className={`${styles.wordCount}`}>
      {limit ? (
        <p className={`${styles.limit} ${shouldWarn ? styles.warning : null}`}>
          {charCount}/{limit} character
        </p>
      ) : (
        false
      )}
      <p className={`${styles.words}`}>{wordsCount} words</p>
    </div>
  );
});
