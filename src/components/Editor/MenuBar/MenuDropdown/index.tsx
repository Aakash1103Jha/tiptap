import { ComponentPropsWithRef } from "react";
import styles from "./menuDropdown.module.css";

export type MenuDropdownPropType = ComponentPropsWithRef<"select"> & {
  options: Record<"id" | "label" | "value", string>[];
};

export default function MenuDropdown({ options, onChange, id }: MenuDropdownPropType) {
  return (
    <select className={`${styles.menuDropdown}`} id={id} onChange={onChange}>
      {options.map((option) => (
        <option className={`${styles.menuDropdownOption}`} key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
