"use client";

import { useState } from "react";
import { fetchGitHubUser, fetchGitHubRepos, fetchGitHubUserEvents } from "../utils/githubApi";

export default function UserComparison() {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);
  const [metrics1, setMetrics1] = useState({});
  const [metrics2, setMetrics2] = useState({});
  const [loading, setLoading] = useState(false);

  const computeCommitFrequency = (events) =>
    events.reduce((count, event) => {
      if (event.type === "PushEvent" && event.payload.commits) {
        return count + event.payload.commits.length;
      }
      return count;
    }, 0);

  const handleCompare = async () => {
    // Trim input values
    const user1Trimmed = username1.trim();
    const user2Trimmed = username2.trim();

    if (!user1Trimmed || !user2Trimmed) {
      alert("Please enter both usernames");
      return;
    }
    setLoading(true);
    try {
      // Fetch profiles, repos, and events in parallel for both users
      const [userData1, userData2] = await Promise.all([
        fetchGitHubUser(user1Trimmed),
        fetchGitHubUser(user2Trimmed)
      ]);

      const [repos1, repos2] = await Promise.all([
        fetchGitHubRepos(user1Trimmed),
        fetchGitHubRepos(user2Trimmed)
      ]);

      const [events1, events2] = await Promise.all([
        fetchGitHubUserEvents(user1Trimmed),
        fetchGitHubUserEvents(user2Trimmed)
      ]);

      setUser1({ ...userData1, repos: repos1 });
      setUser2({ ...userData2, repos: repos2 });

      const commitFrequency1 = computeCommitFrequency(events1);
      const commitFrequency2 = computeCommitFrequency(events2);

      setMetrics1({
        repoCount: repos1.length,
        followers: userData1.followers,
        following: userData1.following,
        commitFrequency: commitFrequency1
      });

      setMetrics2({
        repoCount: repos2.length,
        followers: userData2.followers,
        following: userData2.following,
        commitFrequency: commitFrequency2
      });
    } catch (error) {
      console.error(error);
      alert("Error fetching data for one or both users");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCompare();
    }
  };

  return (
    <div>
      <h2>User Comparison</h2>
      <div className="comparison-inputs">
        <div>
          <input 
            type="text" 
            placeholder="Enter first GitHub username" 
            value={username1} 
            onChange={(e) => setUsername1(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Enter second GitHub username" 
            value={username2} 
            onChange={(e) => setUsername2(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button onClick={handleCompare} disabled={loading}>
          {loading ? "Comparing..." : "Compare"}
        </button>
      </div>

      {user1 && user2 && (
        <div className="comparison-results">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>{user1.login}</th>
                <th>{user2.login}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number of Repos</td>
                <td>{metrics1.repoCount}</td>
                <td>{metrics2.repoCount}</td>
              </tr>
              <tr>
                <td>Followers</td>
                <td>{metrics1.followers}</td>
                <td>{metrics2.followers}</td>
              </tr>
              <tr>
                <td>Following</td>
                <td>{metrics1.following}</td>
                <td>{metrics2.following}</td>
              </tr>
              <tr>
                <td>Commit Frequency</td>
                <td>{metrics1.commitFrequency}</td>
                <td>{metrics2.commitFrequency}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
