import React, { useState, useEffect } from "react";

interface Palavra {
  resposta: string;
  dicas: string[];
}

const palavras: Palavra[] = [
  { resposta: "Smartphone", dicas: ["Dispositivo portátil", "Usado para chamadas e aplicativos"] },
  { resposta: "Wi-Fi", dicas: ["Conexão sem fio", "Permite acesso à internet"] },
  { resposta: "Blockchain", dicas: ["Tecnologia de registros distribuídos", "Base das criptomoedas"] },
  { resposta: "Cloud Computing", dicas: ["Armazenamento remoto", "Acessível pela internet"] },
  { resposta: "Inteligência Artificial", dicas: ["Máquinas que aprendem", "Usada em reconhecimento de voz"] },
  { resposta: "Big Data", dicas: ["Grandes volumes de informação", "Análise para gerar insights"] },
  { resposta: "5G", dicas: ["Rede móvel", "Alta velocidade de conexão"] },
  { resposta: "Realidade Virtual", dicas: ["Ambiente simulado", "Usado em jogos imersivos"] },
  { resposta: "Chatbot", dicas: ["Atendimento automatizado", "Responde mensagens de usuários"] },
  { resposta: "Código QR", dicas: ["Imagem escaneável", "Usado para acessar links rapidamente"] }
];

const JogoAdivinhacao: React.FC = () => {
  const [palavra, setPalavra] = useState<string>("");
  const [dicas, setDicas] = useState<string[]>([]);
  const [tentativas, setTentativas] = useState<string[]>([]);
  const [acertos, setAcertos] = useState<string[]>([]);
  const [letra, setLetra] = useState<string>("");

  useEffect(() => {
    const indice = Math.floor(Math.random() * palavras.length);
    setPalavra(palavras[indice].resposta.toUpperCase());
    setDicas(palavras[indice].dicas);
  }, []);

  const verificarLetra = (): void => {
    const letraUpper = letra.toUpperCase();
    if (tentativas.includes(letraUpper)) return;

    setTentativas((prev) => [...prev, letraUpper]);

    if (palavra.includes(letraUpper)) {
      setAcertos((prev) => [...prev, letraUpper]);
    }
    setLetra("");
  };

  const mostrarPalavra = (): string => {
    return palavra
      .split("")
      .map((char) =>
        char === " " ? " " : acertos.includes(char) ? char : "_"
      )
      .join(" ");
  };

  const venceu: boolean = palavra.split("").every(
    (char) => char === " " || acertos.includes(char)
  );

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>Jogo de Adivinhação de Palavras</h2>
      <p><strong>Dicas:</strong></p>
      <ul>
        {dicas.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <p style={{ fontSize: "24px", letterSpacing: "5px" }}>
        {mostrarPalavra()}
      </p>

      {venceu ? (
        <h3>🎉 Você acertou a palavra: {palavra}!</h3>
      ) : (
        <>
          <input
            type="text"
            maxLength={1}
            value={letra}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLetra(e.target.value)}
          />
          <button onClick={verificarLetra}>Tentar letra</button>
          <p>Tentativas: {tentativas.join(", ")}</p>
        </>
      )}
    </div>
  );
};

export default JogoAdivinhacao;