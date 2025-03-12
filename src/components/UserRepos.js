"use client";
import { useState } from "react";

export default function UserRepos({ repos }) {
  const [displayCount, setDisplayCount] = useState(5);

  if (!repos || repos.length === 0) return <p>No repositories found.</p>;

  const displayedRepos = repos.slice(0, displayCount);

  return (
    <div className="repos-list">
      <h3>Repositories:</h3>
      <ul>
        {displayedRepos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description || "No description available."}</p>
            <span>⭐ {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
      {displayCount < repos.length && (
        <button onClick={() => setDisplayCount(displayCount + 5)}>
          Load More
        </button>
      )}
    </div>
  );
}
