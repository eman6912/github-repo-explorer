import type { Repo } from "../types/repo";

type RepoCardProps = {
  repo: Repo;
};

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="repo-card">
      <div className="repo-card-top">
        <div className="repo-icon">
          ⌘
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="repo-link"
        >
          View
        </a>
      </div>

      <h3>{repo.name}</h3>

      <p className="repo-description">
        {repo.description || "No description provided."}
      </p>

      <div className="repo-meta">
        <span>⭐ {repo.stargazers_count}</span>

        <span>
          {repo.language ? `● ${repo.language}` : "● Unknown"}
        </span>

        <span>
          Updated {new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
}