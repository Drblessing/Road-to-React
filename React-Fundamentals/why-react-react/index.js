const BASE_URL = "https://hn.algolia.com/api/v1/";

async function doSearch(query) {
  const url = `${BASE_URL}search?query=${query}&hitsPerPage=10`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.hits;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      list: [],
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const hits = await doSearch(this.state.input);
    this.setState({ list: hits });
  };

  onChange = (e) => {
    this.setState({ input: e.target.value });
  };

  render() {
    const { input, list } = this.state;
    return (
      <div>
        <h1>Searsch Hacker News with React</h1>
        <form type="submit" onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={input} />
          <button type="text">Search</button>
        </form>
        {list.map((item) => (
          <Item key={item.objectID} item={item} />
        ))}
      </div>
    );
  }
}

const Item = ({ item }) => <div>{item.title}</div>;

const Test = () => <div> heyo</div>;

ReactDOM.render(<Test />, document.getElementById("app"));
// ReactDOM.render(<test />, document.getElementById("test"));
