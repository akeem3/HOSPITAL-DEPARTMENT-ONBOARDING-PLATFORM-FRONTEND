"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPlayerProps {
  url: string;
  title?: string;
  className?: string;
  poster?: string;
}

export function VideoPlayer({
  url,
  title = "Video",
  className = "",
  poster = "/placeholder.svg?height=400&width=800",
}: VideoPlayerProps) {
  const [loading, setLoading] = useState(true);
  const [videoType, setVideoType] = useState<"youtube" | "firebase" | "other">(
    "other"
  );
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    // Detect video type and extract ID if needed
    if (url) {
      // YouTube URL patterns
      const youtubeRegex =
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
      const youtubeMatch = url.match(youtubeRegex);

      if (youtubeMatch && youtubeMatch[1]) {
        setVideoType("youtube");
        setVideoId(youtubeMatch[1]);
      } else if (
        url.includes("firebasestorage") ||
        url.endsWith(".mp4") ||
        url.endsWith(".webm")
      ) {
        setVideoType("firebase");
      } else {
        setVideoType("other");
      }
    }

    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  if (loading) {
    return (
      <div
        className={`aspect-video rounded-lg overflow-hidden bg-muted ${className}`}
      >
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  if (videoType === "youtube") {
    return (
      <div className={`aspect-video rounded-lg overflow-hidden ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`aspect-video rounded-lg overflow-hidden bg-muted ${className}`}
    >
      <video
        src={url}
        controls
        className="h-full w-full"
        poster={poster}
        title={title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
