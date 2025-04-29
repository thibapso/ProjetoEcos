"use client";

import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, X } from "lucide-react";

interface AudioUploadProps {
  onProcess: (file: File) => Promise<void>;
  isProcessing: boolean;
}

export default function AudioUpload({
  onProcess,
  isProcessing,
}: AudioUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];

    if (file.size > 10 * 1024 * 1024) {
      setError("O arquivo deve ter no máximo 10MB");
      return;
    }

    if (!file.type.match("audio.*")) {
      setError("Por favor, selecione um arquivo de áudio válido");
      return;
    }

    setFile(file);
    setAudioUrl(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav"],
    },
    maxFiles: 1,
  });

  const handleProcess = async () => {
    if (file) {
      try {
        await onProcess(file);
      } catch (err) {
        setError("Erro ao processar o áudio. Tente novamente.");
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-gray-700 hover:border-primary"
          }
          ${error ? "border-red-500" : ""}`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setAudioUrl(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <audio
              ref={audioRef}
              src={audioUrl || undefined}
              controls
              className="w-full"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-400">
              {isDragActive
                ? "Solte o arquivo aqui"
                : "Arraste um arquivo de áudio ou clique para selecionar"}
            </p>
            <p className="text-xs text-gray-500">MP3 ou WAV, máximo 10MB</p>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <div className="flex justify-center">
        <Button
          onClick={handleProcess}
          disabled={!file || isProcessing}
          className="w-full max-w-xs"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Processar Áudio"
          )}
        </Button>
      </div>
    </div>
  );
}
