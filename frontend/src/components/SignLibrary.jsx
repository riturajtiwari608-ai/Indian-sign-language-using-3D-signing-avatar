import { useEffect, useMemo, useState } from "react";
import { fetchSignWords } from "../api";

export default function SignLibrary({ iframeRef, disabled = false }) {
  const [words, setWords] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchSignWords()
      .then((data) => {
        if (!cancelled) setWords(data.words || []);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Could not load sign list. Is the backend running?");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return words;
    return words.filter((w) => w.toLowerCase().includes(q));
  }, [words, filter]);

  function playSign(word) {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage({ type: "STOP" }, "*");
    setTimeout(() => {
      win.postMessage({ type: "PLAY_SIGNS", words: [word] }, "*");
    }, 120);
  }

  return (
    <div className="sign-library">
      <button
        type="button"
        className="sign-library-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>Sign library</span>
        <span className="sign-library-count">
          {words.length} words with animation
        </span>
        <span className="sign-library-chevron">{open ? "▼" : "▶"}</span>
      </button>

      {open && (
        <div className="sign-library-body">
          <p className="sign-library-hint">
            Each entry matches a <code>SignFiles/*.sigml</code> file. Click a word to
            play only that sign on the avatar.
          </p>
          <input
            type="search"
            className="sign-library-search"
            placeholder="Filter words…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            disabled={disabled || loading}
          />
          {loadError && <p className="sign-library-error">{loadError}</p>}
          {loading && !loadError && (
            <p className="sign-library-loading">Loading word list…</p>
          )}
          {!loading && !loadError && (
            <>
              <p className="sign-library-meta">
                Showing {filtered.length} of {words.length}
              </p>
              <div className="sign-library-grid" role="list">
                {filtered.map((w) => (
                  <button
                    key={w}
                    type="button"
                    role="listitem"
                    className="sign-library-chip"
                    onClick={() => playSign(w)}
                    disabled={disabled}
                    title={`Play sign: ${w}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
