import { useState } from "react";

export default function InputBox({ onTranslate, loading }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onTranslate(trimmed);
  }

  function handleExample(example) {
    setText(example);
    onTranslate(example);
  }

  return (
    <div className="input-box">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type an English sentence, e.g. I am eating food"
          rows={3}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !text.trim()}>
          {loading ? (
            <span className="spinner-wrap">
              <span className="spinner" />
              Translating...
            </span>
          ) : (
            "Translate to ISL"
          )}
        </button>
      </form>

      <div className="examples">
        <span className="examples-label">Try:</span>
        {[
          "I am eating food",
          "Good morning",
          "Hello welcome",
          "Please help me",
          "I want water",
        ].map(
          (ex) => (
            <button
              key={ex}
              className="example-chip"
              onClick={() => handleExample(ex)}
              disabled={loading}
            >
              {ex}
            </button>
          )
        )}
      </div>
    </div>
  );
}
