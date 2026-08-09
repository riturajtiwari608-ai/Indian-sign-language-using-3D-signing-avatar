import { useEffect, useRef, useState } from "react";
import SignLibrary from "./SignLibrary";

export default function AnimationPlayer({
  signs,
  onSignChange,
  translateLoading = false,
}) {
  const iframeRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || typeof event.data !== "object") return;

      if (event.data.type === "SIGN_CHANGE") {
        onSignChange(event.data.gloss || "");
      } else if (event.data.type === "ANIMATION_COMPLETE") {
        setStatus("done");
        onSignChange("");
      } else if (event.data.type === "ANIMATION_START") {
        setStatus("playing");
      } else if (event.data.type === "PLAYER_READY") {
        setReady(true);
        setStatus("idle");
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSignChange]);

  useEffect(() => {
    if (!signs || signs.length === 0) return;

    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const sendSigns = () => {
      iframe.contentWindow.postMessage(
        { type: "PLAY_SIGNS", words: signs },
        "*"
      );
      setStatus("playing");
    };

    if (ready) {
      sendSigns();
    } else {
      const onLoad = () => {
        setTimeout(sendSigns, 2000);
      };
      iframe.addEventListener("load", onLoad, { once: true });
      return () => iframe.removeEventListener("load", onLoad);
    }
  }, [signs, ready]);

  function handleReplay() {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow || !signs || signs.length === 0)
      return;
    iframe.contentWindow.postMessage(
      { type: "PLAY_SIGNS", words: signs },
      "*"
    );
    setStatus("playing");
  }

  function handleStop() {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage({ type: "STOP" }, "*");
    setStatus("idle");
    onSignChange("");
  }

  return (
    <div className="animation-player">
      <div className="player-header">
        <h3>ISL 3D Avatar Animation</h3>
        <div className="player-controls">
          {status === "playing" && (
            <span className="status-badge playing">
              <span className="pulse-dot" /> Playing
            </span>
          )}
          {status === "done" && (
            <span className="status-badge done">Complete</span>
          )}
          {signs && signs.length > 0 && (
            <>
              <button className="replay-btn" onClick={handleReplay}>
                Replay
              </button>
              <button className="stop-btn" onClick={handleStop}>
                Stop
              </button>
            </>
          )}
        </div>
      </div>

      <div className="player-frame-wrap">
        <iframe
          ref={iframeRef}
          src="/player.html"
          title="ISL 3D Animation Player"
          className="player-iframe"
        />
      </div>

      <SignLibrary iframeRef={iframeRef} disabled={translateLoading} />
    </div>
  );
}
