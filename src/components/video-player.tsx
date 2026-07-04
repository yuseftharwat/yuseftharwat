"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  /** If set, takes precedence: builds an HLS URL and streams via hls.js. */
  muxPlaybackId?: string;
  className?: string;
  autoPlay?: boolean;
  videoAspectRatio?: string;
}

/**
 * Full playback controls (play/pause, volume, progress, fullscreen) plus
 * keyboard shortcuts: Space/K play-pause, F fullscreen, M mute, ←/→ seek.
 *
 * Adaptive streaming is live: when `muxPlaybackId` is provided, this builds
 * `https://stream.mux.com/{id}.m3u8` and plays it via hls.js in browsers
 * without native HLS support (Safari plays it natively). Without a
 * playback ID, it falls back to a plain progressive `src` (e.g. an MP4 on
 * Cloudflare R2 or any static URL).
 */
export function VideoPlayer({ src, poster, muxPlaybackId, className, autoPlay = true, videoAspectRatio }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string | undefined>(undefined);

  const resolvedSrc = muxPlaybackId ? `https://stream.mux.com/${muxPlaybackId}.m3u8` : src;
  const resolvedPoster =
    poster || (muxPlaybackId ? `https://image.mux.com/${muxPlaybackId}/thumbnail.jpg` : undefined);

  // Wire up HLS playback for Mux sources in browsers without native support.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !resolvedSrc.endsWith(".m3u8")) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari: native HLS support, nothing to do.
      video.src = resolvedSrc;
      return;
    }

    let hls: import("hls.js").default | null = null;
    let cancelled = false;

    import("hls.js").then(({ default: Hls }) => {
      if (cancelled) return;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(resolvedSrc);
        hls.attachMedia(video);
      }
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [resolvedSrc]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const seek = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration);
  };

  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = (Number(e.target.value) / 100) * video.duration;
    video.currentTime = time;
    setProgress(Number(e.target.value));
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100);
    };
    const onLoadedMetadata = () => {
      setDuration(video.duration);
      if (video.videoWidth && video.videoHeight) {
        setAspectRatio(`${video.videoWidth} / ${video.videoHeight}`);
      }
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "f":
          toggleFullscreen();
          break;
        case "m":
          toggleMute();
          break;
        case "arrowright":
          seek(5);
          break;
        case "arrowleft":
          seek(-5);
          break;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (resolvedSrc?.includes("vimeo.com")) {
    return (
      <div 
        className={cn("relative w-full rounded-card overflow-hidden shadow-xl", className)}
        style={{ aspectRatio: videoAspectRatio || "16/9" }}
      >
        <iframe
          src={resolvedSrc}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          title="Vimeo Video"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={
        !isFullscreen && aspectRatio
          ? {
              aspectRatio,
              maxWidth: `calc(85vh * (${aspectRatio}))`,
            }
          : undefined
      }
      className={cn(
        "group relative mx-auto overflow-hidden rounded-card outline-none",
        className
      )}
    >
      <video
        ref={videoRef}
        src={resolvedSrc.endsWith(".m3u8") ? undefined : resolvedSrc}
        poster={resolvedPoster}
        muted={muted}
        autoPlay={autoPlay}
        playsInline
        preload="metadata"
        className={cn(
          "block w-full",
          isFullscreen ? "h-full max-h-screen object-contain" : "h-auto"
        )}
        onClick={togglePlay}
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={onScrub}
          aria-label="Seek"
          className="h-1 w-full cursor-pointer accent-accent"
        />
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? "❙❙" : "▶"}
            </button>
            <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
              {muted ? "🔇" : "🔊"}
            </button>
            <span className="text-xs tabular-nums">
              {duration ? `${Math.round(duration)}s` : ""}
            </span>
          </div>
          <button type="button" onClick={toggleFullscreen} aria-label="Fullscreen">
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
}
