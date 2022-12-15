import { useState } from "react";
import "./styles.css";
function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };

  return (
    <div className="App">
      <header>
        <h1 className="Heading">Wiki Search</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </header>
      <div className="results">
        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

          return (
            <div key={i} className="result">
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url}>{result.title}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
