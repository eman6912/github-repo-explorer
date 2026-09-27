type SearchBarProps = {
  username: string;
  onUsernameChange: (username: string) => void;
  onSearch: () => void;
};

export function SearchBar({
  username,
  onUsernameChange,
  onSearch,
}: SearchBarProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Enter a GitHub username..."
          value={username}
          onChange={(event) => onUsernameChange(event.target.value)}
        />
      </div>

      <button type="submit">
        Explore Repos
      </button>
    </form>
  );
}