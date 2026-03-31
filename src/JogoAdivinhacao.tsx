import styles from "./index.module.css";
import React, { useState, useEffect } from "react";
import { WORDS } from "./utils/word.ts";



const JogoAdivinhacao: React.FC = () => {
  const [palavra, setPalavra] = useState<string>("");
  const [dicas, setDicas] = useState<string[]>([]);
  const [tentativas, setTentativas] = useState<string[]>([]);
  const [acertos, setAcertos] = useState<string[]>([]);
  const [letra, setLetra] = useState<string>("");

  useEffect(() => {
    const indice = Math.floor(Math.random() * WORDS.length);
    setPalavra(WORDS[indice].word.toUpperCase());
    setDicas(WORDS[indice].tip);
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

        // Default: caixinha vazia
        return <span key={index} className={`${styles.caixinha} ${styles.vazio}`}></span>
      })}
    </div>
  );
};

  const venceu: boolean = palavra.split("").every(
    (char) => char === " " || acertos.includes(char)
  );

  return (
    <div className={styles.container}>
      <h2>Jogo de Adivinhação de Palavras</h2>
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
        <h3>🎉 Você acertou a palavra: {palavra}!</h3>
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