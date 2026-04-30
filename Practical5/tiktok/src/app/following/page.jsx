export default function FollowingPage() {
  const users = [
    { id: 1, username: "user_1", name: "User 1" },
    { id: 2, username: "user_2", name: "User 2" },
    { id: 3, username: "user_3", name: "User 3" },
    { id: 4, username: "user_4", name: "User 4" },
    { id: 5, username: "user_5", name: "User 5" },
    { id: 6, username: "user_6", name: "User 6" },
    { id: 7, username: "user_7", name: "User 7" },
    { id: 8, username: "user_8", name: "User 8" },
  ];

  return (
    <main style={{ padding: "30px" }}>
      <h1>Follow accounts</h1>
      <p style={{ color: "#64748b" }}>
        Follow accounts to see their latest videos
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "25px",
          marginTop: "30px",
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              textAlign: "center",
              padding: "20px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#d1d5db",
                margin: "0 auto 12px",
              }}
            ></div>

            <h3>{user.username}</h3>
            <p style={{ color: "#64748b" }}>{user.name}</p>

            <button
              style={{
                background: "#ff2f3d",
                color: "white",
                border: "none",
                padding: "8px 22px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}