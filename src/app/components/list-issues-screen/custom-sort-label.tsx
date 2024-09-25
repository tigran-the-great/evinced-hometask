import React from "react";
import styles from "./styles/issue-list-table.module.scss";

interface TableSortProps {
  direction: "asc" | "desc";
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const CustomSortLabel: React.FC<TableSortProps> = ({
  direction,
  active,
  children,
  onClick,
}) => {
  return (
    <>
      <span onClick={onClick} className={styles.sortLabel}>
        {children}
      </span>
      <span
        style={{ position: "relative" }}
        className={
          active
            ? direction === "asc"
              ? styles.up
              : styles.down
            : styles.neutral
        }
      ></span>
    </>
  );
};
