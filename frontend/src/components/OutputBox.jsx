export default function OutputBox({ gloss, currentSign, loading }) {
  if (loading) {
    return (
      <div className="output-box">
        <h3>ISL Gloss</h3>
        <div className="gloss-loading">
          <span className="spinner" /> Analyzing sentence...
        </div>
      </div>
    );
  }

  if (!gloss.length) {
    return (
      <div className="output-box">
        <h3>ISL Gloss</h3>
        <p className="empty-state">Gloss tokens will appear here after translation</p>
      </div>
    );
  }

  return (
    <div className="output-box">
      <h3>ISL Gloss</h3>
      <div className="gloss-tokens">
        {gloss.map((token, i) => (
          <span
            key={i}
            className={`gloss-chip ${currentSign.toLowerCase() === token.toLowerCase() ? "active" : ""}`}
          >
            {token.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
