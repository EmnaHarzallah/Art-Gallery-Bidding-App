import React from "react";

export default function Footer() {
  return (
    <footer
      className="card-footer bg-black border-success"
      style={{
        background: "#820808",
        padding: "12px 24px",
        color: "#fff",
        textAlign: "center",
        marginTop: "32px",
        borderRadius: "8px",
        maxWidth: "700px",
        margin: "32px auto 0 auto",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ margin: 0 }}>
        &copy; {new Date().getFullYear()} Art Gallery Bidding App. All rights
        reserved.
      </p>
    </footer>
  );
}
