const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

export async function textToSpeech(text: string, voiceId: string) {
  try {
    console.log("Iniciando conversão de texto para fala...");
    console.log("Texto a ser convertido:", text);
    console.log("Voz selecionada:", voiceId);

    const requestBody = {
      text: text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
      },
    };

    const response = await fetch(
      `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail?.message ||
          `Erro ao converter texto para fala: ${response.status}`
      );
    }

    return await response.blob();
  } catch (error) {
    console.error("Erro na conversão de texto para fala:", error);
    throw error;
  }
}

export async function cloneVoice(audioFile: File) {
  try {
    console.log("Iniciando clonagem de voz...");
    console.log("Tamanho do arquivo:", audioFile.size);
    console.log("Tipo do arquivo:", audioFile.type);

    // Verificar se o arquivo é um áudio válido
    if (!audioFile.type.startsWith('audio/')) {
      throw new Error("O arquivo deve ser um arquivo de áudio válido");
    }

    // Verificar o tamanho do arquivo (máximo 10MB)
    if (audioFile.size > 10 * 1024 * 1024) {
      throw new Error("O arquivo de áudio deve ter no máximo 10MB");
    }

    const formData = new FormData();
    formData.append("files", audioFile);
    formData.append("name", "Cloned Voice");
    formData.append("description", "Voz clonada a partir de áudio");
    formData.append("labels", JSON.stringify({
      accent: "neutral",
      age: "young",
      gender: "neutral",
      use_case: "conversation"
    }));

    console.log("Enviando requisição para clonagem...");
    const response = await fetch(`${ELEVENLABS_API_URL}/voices/add`, {
      method: "POST",
      headers: {
        "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || "",
      },
      body: formData,
    });

    console.log("Status da resposta:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro detalhado:", errorData);
      
      // Tratamento específico de erros comuns
      if (response.status === 401) {
        throw new Error("Chave de API inválida ou expirada");
      } else if (response.status === 402) {
        throw new Error("Limite de uso excedido ou plano insuficiente");
      } else if (response.status === 413) {
        throw new Error("Arquivo muito grande. Tamanho máximo: 10MB");
      } else if (response.status === 415) {
        throw new Error("Formato de arquivo não suportado");
      }
      
      throw new Error(
        errorData.detail?.message ||
        errorData.message ||
        `Erro ao clonar voz: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Voz clonada com sucesso. Voice ID:", data.voice_id);
    return data.voice_id;
  } catch (error) {
    console.error("Erro na clonagem de voz:", error);
    if (error instanceof Error) {
      console.error("Mensagem de erro:", error.message);
      console.error("Stack trace:", error.stack);
    }
    throw error;
  }
}
