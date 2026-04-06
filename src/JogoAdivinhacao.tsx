import styles from "./index.module.css";
import React, { useState, useEffect } from "react";
import { WORDS } from "./utils/word.ts";

const JogoAdivinhacao: React.FC = () => {
  const [palavra, setPalavra] = useState<string>("");
  const [dicas, setDicas] = useState<string[]>([]);
  const [tentativas, setTentativas] = useState<string[]>([]);
  const [acertos, setAcertos] = useState<string[]>([]);
  const [letra, setLetra] = useState<string>("");

  const [jogador, setJogador] = useState<string>("");
  const [placar, setPlacar] = useState<number>(0);

  useEffect(() => {
    iniciarNovaRodada();
  }, []);

  const iniciarNovaRodada = () => {
    const indice = Math.floor(Math.random() * WORDS.length);
    setPalavra(WORDS[indice].word.toUpperCase());
    setDicas(WORDS[indice].tip);
    setTentativas([]);
    setAcertos([]);
    setLetra("");
  };

  const verificarLetra = (): void => {
    const letraUpper = letra.toUpperCase();
    if (tentativas.includes(letraUpper)) return;

    setTentativas((prev) => [...prev, letraUpper]);

    if (palavra.includes(letraUpper)) {
      setAcertos((prev) => [...prev, letraUpper]);
    }
    setLetra("");
  };

  const mostrarPalavra = () => {
    return (
      <div className="palavra">
        {palavra.split("").map((char, index) => {
          if (char === " ") {
            return <span key={index} className={styles.espaco}>&nbsp;</span>;
          }

          if (acertos.includes(char)) {
            return (
              <span key={index} className={`${styles.caixinha} ${styles.acerto}`}>
                {char}
              </span>
            );
          }

          return <span key={index} className={`${styles.caixinha} ${styles.vazio}`}></span>
        })}
      </div>
    );
  };

  const venceu: boolean = palavra.split("").every(
    (char) => char === " " || acertos.includes(char)
  );

  // Quando vencer, soma 1 ponto e inicia nova rodada
  const handleNovaRodada = () => {
    setPlacar((prev) => prev + 1); // ✅ soma 1 ponto por palavra revelada
    iniciarNovaRodada();
  };

  return (
    <div className={styles.container}>
      <h2>Jogo de Adivinhação de Palavras</h2>

      {!jogador ? (
        <div className={styles.wrapperInput}>
          <input
          maxLength={20}
            type="text"
            placeholder="Digite seu nome"
            value={jogador}
            onChange={(e) => setJogador(e.target.value)}
          />
        </div>
      ) : (
        <p><strong>Jogador:</strong> {jogador}</p>
      )}

      <p><strong>Placar:</strong> {placar}</p>

      <p><strong>Dicas:</strong></p>
      <ul>
        {dicas.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <div className={styles.word}>
        {mostrarPalavra()}
      </div>

      {venceu ? (
        <>
          <h3>🎉 Parabéns {jogador}, você acertou a palavra: {palavra}!</h3>
          <button onClick={handleNovaRodada}>Iniciar nova rodada</button>
        </>
      ) : (
        <>
          <div className={styles.wrapperInput}>
            <input
              type="text"
              maxLength={1}
              value={letra}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLetra(e.target.value)}
            />
            <button onClick={verificarLetra}>Tentar letra</button>
          </div>
          <p>Tentativas: {tentativas.join(", ")}</p>
        </>
      )}
    </div>
  );
};

export default JogoAdivinhacao;