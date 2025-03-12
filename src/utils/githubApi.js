export async function fetchGitHubUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found");
    return response.json();
  }
  
  export async function fetchGitHubRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) throw new Error("Repositories not found");
    return response.json();
  }
  
  export async function fetchGitHubUserEvents(username) {
    const response = await fetch(`https://api.github.com/users/${username}/events`);
    if (!response.ok) throw new Error("Events not found");
    return response.json();
  }
  