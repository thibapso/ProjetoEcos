"use client";

import { useState } from "react";
import Model3D from "@/components/Model3D";
import { textToSpeech, cloneVoice } from "@/lib/elevenlabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VozesPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedAudio, setProcessedAudio] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [clonedVoiceId, setClonedVoiceId] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleAudioUpload = async () => {
    if (!audioFile) {
      setError("Por favor, selecione um arquivo de áudio");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProcessedAudio(null);

    try {
      const voiceId = await cloneVoice(audioFile);
      setClonedVoiceId(voiceId);
      setError(null);
    } catch (err) {
      console.error("Erro ao clonar voz:", err);
      setError("Erro ao clonar a voz. Por favor, tente novamente.");
      setClonedVoiceId(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcess = async () => {
    if (!clonedVoiceId) {
      setError("Por favor, faça o upload de um áudio para clonar sua voz primeiro");
      return;
    }

    if (!text.trim()) {
      setError("Por favor, digite um texto para converter");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProcessedAudio(null);

    try {
      const audioBlob = await textToSpeech(text, clonedVoiceId);
      const url = URL.createObjectURL(audioBlob);
      setProcessedAudio(url);
    } catch (err) {
      console.error("Erro no processamento:", err);
      let errorMessage = "Erro ao processar o texto. Por favor, tente novamente.";

      if (err instanceof Error) {
        errorMessage = err.message;
        if (err.message.includes("401")) {
          errorMessage = "Erro de autenticação. Verifique se a chave da API está correta.";
        } else if (err.message.includes("404")) {
          errorMessage = "Serviço não encontrado. Verifique se o endpoint está correto.";
        }
      }

      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setProcessedAudio(null);
    setError(null);
  };

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center overflow-hidden fixed inset-0">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Modelo 3D */}
          <div className="relative h-[500px] flex items-center justify-center">
            <Model3D />
          </div>

          {/* Conteúdo */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white">
                Clone a voz de quem você ama!
              </h1>
              <p className="text-gray-300 text-lg">
                Faça o upload de um áudio com uma voz e use-a para criar novos
                áudios a partir de texto.
              </p>
            </div>

            <div className="space-y-6">
              {/* Upload de Áudio */}
              <div className="space-y-3">
                <Label htmlFor="audio" className="text-sm font-medium text-gray-200">
                  Selecione um arquivo de áudio
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="audio"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="bg-transparent border-gray-700 text-white"
                  />
                  <Button
                    onClick={handleAudioUpload}
                    disabled={isProcessing || !audioFile}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {isProcessing ? "Processando..." : "Clonar Voz"}
                  </Button>
                </div>
                {clonedVoiceId && (
                  <Alert className="bg-green-900/50 border-green-700">
                    <AlertDescription>
                      Voz clonada com sucesso! ID: {clonedVoiceId}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Campo de Texto */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-200">
                  Digite o texto para converter
                </Label>
                <Textarea
                  placeholder="Digite o texto que você deseja converter em voz..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[150px] bg-transparent border-gray-700 text-white placeholder-gray-400"
                  disabled={!clonedVoiceId}
                />
              </div>

              {/* Botão de Conversão */}
              <Button
                onClick={handleProcess}
                disabled={isProcessing || !clonedVoiceId}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isProcessing ? "Processando..." : "Converter para Voz"}
              </Button>
            </div>

            {/* Player de Áudio */}
            {processedAudio && (
              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-lg blur-xl" />
                  <div className="relative p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <audio controls className="w-full">
                      <source src={processedAudio} type="audio/mpeg" />
                      Seu navegador não suporta o elemento de áudio.
                    </audio>
                    <Button
                      variant="outline"
                      onClick={handleRetry}
                      className="mt-4 w-full border-gray-700 text-gray-200 hover:bg-gray-800"
                    >
                      Tentar Novamente
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Mensagem de Erro */}
            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-700">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
