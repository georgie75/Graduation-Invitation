import { useEffect, useRef, useState } from "react";
import songUrl from "../../assets/graduationsong.m4a";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasManuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const audio = new Audio(songUrl);
    audio.loop = true;
    audioRef.current = audio;

    const syncPlayingState = () => setPlaying(!audio.paused);

    audio.addEventListener("play", syncPlayingState);
    audio.addEventListener("pause", syncPlayingState);

    audio
      .play()
      .then(syncPlayingState)
      .catch(() => syncPlayingState());

    function onVisibilityChange() {
      if (document.hidden) {
        audio.pause();
      } else if (!document.hidden && !wasManuallyPaused.current) {
        audio
          .play()
          .then(syncPlayingState)
          .catch(() => syncPlayingState());
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("play", syncPlayingState);
      audio.removeEventListener("pause", syncPlayingState);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      wasManuallyPaused.current = true;
    } else {
      wasManuallyPaused.current = false;
      audio
        .play()
        .then(() => setPlaying(!audio.paused))
        .catch(() => setPlaying(!audio.paused));
    }
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary/90 shadow-xl text-white flex items-center justify-center hover:bg-primary transition-colors backdrop-blur-sm">
      <span className="material-symbols-outlined text-2xl">{playing ? "music_note" : "music_off"}</span>
    </button>
  );
}
