import { useEffect, useRef, useState } from "react";
import songUrl from "../../assets/graduationsong.m4a";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const audio = new Audio(songUrl);
    audio.loop = true;
    audioRef.current = audio;

    audio.play().catch(() => setPlaying(false));

    function onVisibilityChange() {
      if (document.hidden) {
        audio.pause();
        setPlaying(false);
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary/90 shadow-xl text-white flex items-center justify-center hover:bg-primary transition-colors backdrop-blur-sm"
    >
      <span className="material-symbols-outlined text-2xl">
        {playing ? "music_note" : "music_off"}
      </span>
    </button>
  );
}
