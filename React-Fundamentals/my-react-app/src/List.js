import React from "react";
import styles from "./App.module.css";
import { sortBy } from "lodash";

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENT: (list) => sortBy(list, "num_comments").reverse(),
  POINT: (list) => sortBy(list, "points").reverse(),
};

function List({ list, onRemoveItem, setList }) {
  // const [toggle, setToggle] = React.useState(false);
  const [sort, setSort] = React.useState("NONE");
  const handleSort = (sortKey) => {
    setSort(sortKey);
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
              handleSort("title");
            }}
            className={`${styles.button} ${styles.buttonSmall}`}
          >
            Title
          </button>
        </span>
        <span style={{ width: "30%" }}>
          <button
            type="button"
            onClick={() => {
              handleSort("author");
            }}
            className={`${styles.button} ${styles.buttonSmall}`}
          >
            Author
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            onClick={() => {
              handleSort("num_comments");
            }}
            className={`${styles.button} ${styles.buttonSmall}`}
          >
            Num Comments
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            onClick={() => {
              handleSort("points");
            }}
            className={`${styles.button} ${styles.buttonSmall}`}
          >
            Points
          </button>
        </span>
      </div>
      {sortedList.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
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
