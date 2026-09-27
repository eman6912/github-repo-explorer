import { useEffect, useState } from "react";
import type { Repo, SortKey, Status } from "../types/repo";
import { RepoCard } from "./RepoCard";

type RepoListProps = {
  username: string;
  sort: SortKey;
};

export function RepoList({
  username,
  sort,
}: RepoListProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!username) {
      setRepos([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();

    async function loadRepos() {
      setStatus("loading");

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: Repo[] = await response.json();

        const nonForkRepos = data.filter(
          (repo) => !repo.fork
        );

        setRepos(nonForkRepos);
        setStatus("ready");
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        setStatus("error");
      }
    }

    loadRepos();

    return () => controller.abort();
  }, [username]);

  const sortedRepos = [...repos].sort((a, b) => {
    if (sort === "stars") {
      return b.stargazers_count - a.stargazers_count;
    }

    if (sort === "recent") {
      return (
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
      );
    }

    return a.name.localeCompare(b.name);
  });

  if (status === "idle") {
    return (
      <div className="state-card">
        <div className="state-icon">⌘</div>
        <h2>Discover amazing repositories</h2>
        <p>
          Enter a GitHub username above to explore their
          public repositories.
        </p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="state-card">
        <div className="spinner"></div>
        <h2>Finding repositories...</h2>
        <p>Talking to GitHub. Just a moment.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="state-card error-state">
        <div className="state-icon">!</div>
        <h2>We couldn't find that user</h2>
        <p>
          Check the username and make sure the GitHub
          account exists.
        </p>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="state-card">
        <div className="state-icon">○</div>
        <h2>No repositories found</h2>
        <p>This user doesn't have any public repositories.</p>
      </div>
    );
  }

  return (
    <div className="repo-grid">
      {sortedRepos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}