import { ComponentPropsWithRef, memo, useCallback, useEffect, useState } from "react";

import styles from "./menuButton.module.css";
import { Editor } from "@tiptap/react";

export type MenuButtonPropType = ComponentPropsWithRef<"button"> & {
  biName?: string;
  label?: string;
};
export default function MenuButton({
  id,
  onClick,
  disabled,
  type = "button",
  className,
  label,
  biName,
  title,
}: MenuButtonPropType) {
  return (
    <button
      title={label ?? title}
      aria-label={title}
      disabled={disabled}
      type={type}
      className={`${styles.menuButton} ${className}`}
      onClick={onClick}
      id={id}
    >
      {biName ? <i className={`bi-${biName}`}></i> : false}
      {label ? label : false}
    </button>
  );
}
