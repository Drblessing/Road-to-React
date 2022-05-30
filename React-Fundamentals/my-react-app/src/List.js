import React from "react";
import styles from "./App.module.css";
import { orderBy } from "lodash";

function List({ list, onRemoveItem }) {
  const SORTS = {
    NONE: (list) => list,
    TITLE: (list) => orderBy(list, "title", toggle ? "asc" : "desc"),
    AUTHOR: (list) => orderBy(list, "author", toggle ? "asc" : "desc"),
    COMMENT: (list) => orderBy(list, "num_comments", toggle ? "asc" : "desc"),
    POINT: (list) => orderBy(list, "points", toggle ? "asc" : "desc"),
  };

  const [toggle, setToggle] = React.useState(false);
  const [sort, setSort] = React.useState("NONE");
  const [activeSort, setActiveSort] = React.useState(null);
  const handleSort = (sortKey) => {
    if (sort === sortKey) setToggle(!toggle);
    else setToggle(false);
    setSort(sortKey);
    setActiveSort(sortKey);
  };
  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <span style={{ width: "40%" }}>
          <button
            type="button"
            onClick={() => {
              handleSort("TITLE");
            }}
            className={`${styles.button} ${styles.buttonSmall} ${
              activeSort === "TITLE" ? styles.activeSort : ""
            }`}
          >
            Title {activeSort === "TITLE" ? (toggle ? "▼" : "▲") : ""}
          </button>
        </span>
        <span style={{ width: "30%" }}>
          <button
            type="button"
            onClick={() => {
              handleSort("AUTHOR");
            }}
            className={`${styles.button} ${styles.buttonSmall} ${
              activeSort === "AUTHOR" ? styles.activeSort : ""
            }`}
          >
            Author {activeSort === "AUTHOR" ? (toggle ? "▼" : "▲") : ""}
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            onClick={() => {
              handleSort("COMMENT");
            }}
            className={`${styles.button} ${styles.buttonSmall} ${
              activeSort === "COMMENT" ? styles.activeSort : ""
            }`}
          >
            Num Comments {activeSort === "COMMENT" ? (toggle ? "▼" : "▲") : ""}
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            onClick={() => {
              handleSort("POINT");
            }}
            className={`${styles.button} ${styles.buttonSmall} ${
              activeSort === "POINT" ? styles.activeSort : ""
            }`}
          >
            Points {activeSort === "POINT" ? (toggle ? "▼" : "▲") : ""}
          </button>
        </span>
      </div>
      {sortedList.map((item, index) => (
        <Item
          key={item.objectID + index}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
}

function Item({ item, onRemoveItem }) {
  return (
    <div className={styles.item}>
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title} </a>
      </span>
      <span style={{ width: "30%" }}>{item.author} </span>
      <span style={{ width: "10%" }}>{item.num_comments} </span>
      <span style={{ width: "10%" }}>{item.points} </span>
      <span style={{ width: "10%" }}>
        <button
          type="button"
          onClick={() => onRemoveItem(item)}
          className={`${styles.button} ${styles.buttonSmall}`}
        >
          Dismiss
        </button>
      </span>
    </div>
  );
}

export default List;
