export default function ErrorPage() {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff",
  };

  const cardStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  };

  const headingStyle: React.CSSProperties = {
    color: "red",
    fontSize: "24px",
    margin: "0 0 10px",
  };

  return (
    <>
      {/* <Header /> */}
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>404!</h1>
          <img
            src="/img/error.png"
            alt="Success"
            style={{ width: "500px", height: "500px" }}
          />
        </div>
      </div>
    </>
  );
}
