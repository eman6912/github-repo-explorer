export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
};

export type SortKey = "stars" | "recent" | "name";

export type Status = "idle" | "loading" | "error" | "ready";