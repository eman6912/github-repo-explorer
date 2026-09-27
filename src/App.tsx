import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { SortDropdown } from "./components/SortDropdown";
import { RepoList } from "./components/RepoList";
import type { SortKey } from "./types/repo";
import "./App.css";

function App() {
  const [inputUsername, setInputUsername] = useState("");
  const [username, setUsername] = useState("");
  const [sort, setSort] = useState<SortKey>("stars");

  function handleSearch() {
    setUsername(inputUsername.trim());
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="github-mark">⌘</div>

        <p className="eyebrow">GITHUB REPO EXPLORER</p>

        <h1>
          Explore code.
          <br />
          <span>Discover builders.</span>
        </h1>

        <p className="hero-text">
          Search any GitHub username and discover their
          public repositories, stars, languages, and latest
          updates.
        </p>

        <SearchBar
          username={inputUsername}
          onUsernameChange={setInputUsername}
          onSearch={handleSearch}
        />
      </header>

      <main className="content">
        {username && (
          <div className="results-header">
            <div>
              <p className="results-label">RESULTS FOR</p>
              <h2>@{username}</h2>
            </div>

            <SortDropdown
              value={sort}
              onChange={setSort}
            />
          </div>
        )}

        <RepoList
          username={username}
          sort={sort}
        />
      </main>

      <footer>
        Built with React + TypeScript · Powered by GitHub
      </footer>
    </div>
  );
}

export default App;