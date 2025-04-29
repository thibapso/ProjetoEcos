"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Play, Pause, RotateCcw } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  onRetry: () => void;
}

export default function AudioPlayer({ audioUrl, onRetry }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "audio-processado.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <audio
          ref={audioRef}
          src={audioUrl}
          className="w-full"
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={togglePlay}
          variant="outline"
          className="w-12 h-12 p-0 rounded-full"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="w-12 h-12 p-0 rounded-full"
        >
          <Download className="h-6 w-6" />
        </Button>
        <Button
          onClick={onRetry}
          variant="outline"
          className="w-12 h-12 p-0 rounded-full"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
