// import logo from "./logo.svg";
// import "./App.css";
import React from "react";

function useSemiPersistentState(key, initialState) {
  let tempState;
  if (localStorage.getItem(key) === null) {
    tempState = initialState;
  } else {
    tempState = localStorage.getItem(key);
  }
  const [value, setValue] = React.useState(tempState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

function App() {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      />
      <hr />
      <List list={searchedStories} />
    </div>
  );
}

function Search({ search, onSearch }) {
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </>
  );
}

function InputWithLabel({ id, label, value, type = "text", onInputChange }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      &nbsp;
      <input id={id} type={type} value={value} onChange={onInputChange} />
    </>
  );
}

function List({ list }) {
  return list.map((item) => <Item key={item.objectID} item={item} />);
}

function Item({ item }) {
  return (
    <div>
      <span>
        <a href={item.url}>{item.title} </a>
      </span>
      <span>{item.author} </span>
      <span>{item.num_comments} </span>
      <span>{item.points} </span>
    </div>
  );
}

export default App;
