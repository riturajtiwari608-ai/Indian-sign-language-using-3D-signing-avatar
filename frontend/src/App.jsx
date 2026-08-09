import { useState } from "react";
import InputBox from "./components/InputBox";
import OutputBox from "./components/OutputBox";
import AnimationPlayer from "./components/AnimationPlayer";
import { translateText } from "./api";

export default function App() {
  const [gloss, setGloss] = useState([]);
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSign, setCurrentSign] = useState("");

  async function handleTranslate(text) {
    setError("");
    setGloss([]);
    setSigns([]);
    setCurrentSign("");
    setLoading(true);

    try {
      const data = await translateText(text);
      setGloss(data.gloss);
      setSigns(data.signs);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Indian Sign Language Translator</h1>
        <p className="subtitle">
          Type an English sentence and watch it translated into ISL with a 3D signing avatar
        </p>
      </header>

      <main className="app-main">
        <section className="input-section">
          <InputBox onTranslate={handleTranslate} loading={loading} />
          {error && <div className="error-banner">{error}</div>}
        </section>

        <section className="output-section">
          <OutputBox gloss={gloss} currentSign={currentSign} loading={loading} />
        </section>

        <section className="player-section">
          <AnimationPlayer
            signs={signs}
            onSignChange={setCurrentSign}
            translateLoading={loading}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>ISL Translator &mdash; Powered by CWA Signing Avatars &amp; HamNoSys SiGML</p>
      </footer>
    </div>
  );
}
