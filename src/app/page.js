"use client";

import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import UserProfile from "../components/UserProfile";
import UserRepos from "../components/UserRepos";
import UserComparison from "../components/UserComparison";
import { fetchGitHubUser, fetchGitHubRepos } from "../utils/githubApi";
import "../styles/globals.css";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState("single"); // "single" or "compare"
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && mode === "single" && username.trim()) {
      const fetchData = async () => {
        try {
          const trimmedUsername = username.trim();
          const userData = await fetchGitHubUser(trimmedUsername);
          const reposData = await fetchGitHubRepos(trimmedUsername);
          setUser(userData);
          setRepos(reposData);
        } catch (error) {
          alert("User not found!");
          setUser(null);
          setRepos([]);
        }
      };
      fetchData();
    }
  }, [mounted, username, mode]);

  if (!mounted) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <header className="header">
        <h1>GitHub Profile Explorer</h1>
        <p>Explore GitHub profiles and repositories with ease.</p>
      </header>

      <nav className="mode-toggle">
        {['single', 'compare'].map((item) => (
          <button
            key={item}
            className={`toggle-btn ${mode === item ? "active" : ""}`}
            onClick={() => setMode(item)}
            aria-pressed={mode === item}
          >
            {item === "single" ? "Single User" : "Compare Users"}
          </button>
        ))}
      </nav>

      <main>
        {mode === "single" ? (
          <section className="single-user-section card">
            <div className="search-container">
              <SearchBar onSearch={setUsername} />
            </div>
            {user && <UserProfile user={user} />}
            {repos.length > 0 && <UserRepos repos={repos} />}
          </section>
        ) : (
          <section className="compare-users-section card">
            <UserComparison />
          </section>
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} GitHub Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
}
