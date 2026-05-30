

import React, { useState, useEffect } from "react";
import { Text, Button, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

/**
 * @typedef {Object} Carta
 * @property {number} id - identificatore carta
 * @property {string} nome - nome della carta
 * @property {any} immagine - immagine della carta
 * @property {number} indice - valore di sfortuna
 */

/**
 * Lista delle carte del gioco
 * @type {Carta[]}
 */
const CARTE = [
  { id: 1, nome: "Gol Assurdo del Portiere", immagine: require("./assets/card_01.png"), indice: 5.0 },
  { id: 2, nome: "Lag Inaccettabile", immagine: require("./assets/card_02.png"), indice: 7.0 },
  { id: 3, nome: "Espulso per Nulla", immagine: require("./assets/card_03.png"), indice: 9.0 },
  { id: 4, nome: "Rigore Negato al 90'", immagine: require("./assets/card_04.png"), indice: 11.0 },
  { id: 5, nome: "Caricamento Infinito", immagine: require("./assets/card_05.png"), indice: 13.0 },
  { id: 6, nome: "Vergogna Totale 0-5", immagine: require("./assets/card_06.png"), indice: 15.0 },
  { id: 7, nome: "Tiro al 90' sulla Traversa", immagine: require("./assets/card_07.png"), indice: 17.0 },
  { id: 8, nome: "Pacchetto Disastroso", immagine: require("./assets/card_08.png"), indice: 19.0 },
  { id: 9, nome: "Tattiche Sbuggiate", immagine: require("./assets/card_09.png"), indice: 21.0 },
  { id: 10, nome: "Infortunio al 90'", immagine: require("./assets/card_10.png"), indice: 23.0 },
];

/**
 * Mescola un array in modo casuale
 * @param {Array} arr - array da mescolare
 * @returns {Array} array mescolato
 */
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/**
 * Componente principale del gioco
 * @returns {JSX.Element}
 */
export default function App() {

  /** @type {[string, Function]} stato della fase di gioco */
  const [fase, setFase] = useState("home");

  /** @type {[Carta[], Function]} mano del giocatore */
  const [mano, setMano] = useState([]);

  /** @type {[Carta|null, Function]} carta del round */
  const [cartaRound, setCartaRound] = useState(null);

  /** vite del giocatore */
  const [vite, setVite] = useState(3);

  /** timer del round */
  const [timer, setTimer] = useState(30);

  /** messaggio di stato */
  const [messaggio, setMessaggio] = useState("");

  /**
   * Avvia la partita
   */
  const startGame = () => {
    const iniziali = shuffle(CARTE)
      .slice(0, 3)
      .sort((a, b) => a.indice - b.indice);

    setMano(iniziali);
    setVite(3);
    setMessaggio("");
    setFase("gioco");
  };

  /**
   * Genera un nuovo round
   */
  const nuovoRound = () => {
    const disponibili = CARTE.filter(
      (c) => !mano.find((x) => x.id === c.id)
    );

    setCartaRound(shuffle(disponibili)[0]);
    setTimer(30);
    setFase("round");
  };

  /**
   * Controlla la scelta del giocatore
   * @param {Carta} c - carta scelta
   */
  const controlla = (c) => {
    const ordine = [...mano, cartaRound].sort((a, b) => a.indice - b.indice);

    if (cartaRound.indice > c.indice) {
      setMano(ordine);
      setMessaggio("Giusto");
    } else {
      setVite((v) => v - 1);
      setMessaggio("Sbagliato");
    }

    setFase("risultato");
  };

  /**
   * Timer del round
   */
  useEffect(() => {
    if (fase !== "round") return;

    if (timer === 0) {
      setVite((v) => v - 1);
      setMessaggio("Tempo scaduto");
      setFase("risultato");
      return;
    }

    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, fase]);

  /**
   * Controllo fine partita
   */
  useEffect(() => {
    if (vite === 0) {
      setFase("fine");
      setMessaggio("Hai perso");
    }

    if (mano.length === 6) {
      setFase("fine");
      setMessaggio("Hai vinto");
    }
  }, [vite, mano]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>

        {fase === "home" && (
          <>
            <Text>Gioco della Sfortuna</Text>
            <Button title="Inizia" onPress={startGame} />
          </>
        )}

        {fase === "gioco" && (
          <>
            <Text>Carte: {mano.length} / 6</Text>
            <Text>Vite: {vite}</Text>

            {mano.map((c) => (
              <Text key={c.id}>{c.nome}</Text>
            ))}

            <Button title="Nuovo Round" onPress={nuovoRound} />
          </>
        )}

        {fase === "round" && (
          <>
            <Text>{timer}</Text>
            <Text>{cartaRound?.nome}</Text>

            <Image
              source={cartaRound?.immagine}
              style={{ width: 200, height: 120 }}
            />

            {mano.map((c) => (
              <Button key={c.id} title={c.nome} onPress={() => controlla(c)} />
            ))}
          </>
        )}

        {fase === "risultato" && (
          <>
            <Text>{messaggio}</Text>
            <Button title="Continua" onPress={() => setFase("gioco")} />
          </>
        )}

        {fase === "fine" && (
          <>
            <Text>{messaggio}</Text>
            <Button title="Ricomincia" onPress={() => setFase("home")} />
          </>
        )}

      </SafeAreaView>
    </SafeAreaProvider>
  );
}