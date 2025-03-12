"use client";

export default function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div className="user-profile">
      <img 
        src={user.avatar_url || "https://via.placeholder.com/150"} 
        alt="Profile" 
      />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio || "No bio available."}</p>
      <p>
        Followers: {user.followers ?? "N/A"} | Following: {user.following ?? "N/A"}
      </p>
    </div>
  );
}
