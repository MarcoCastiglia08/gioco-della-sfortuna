

import React, { useState, useEffect } from "react";
import { Text, Button, Image, } from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

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
  { id: 11, nome: "Gol al Kickoff", immagine: require("./assets/card_11.png"), indice: 25.0 },
  { id: 12, nome: "Sconfitta con Possesso 80%", immagine: require("./assets/card_12.png"), indice: 27.0 },
  { id: 13, nome: "Energia Finita", immagine: require("./assets/card_13.png"), indice: 29.0 },
  { id: 14, nome: "Gol di Rimbalzo", immagine: require("./assets/card_14.png"), indice: 31.0 },
  { id: 15, nome: "Disconnessione", immagine: require("./assets/card_15.png"), indice: 33.0 },
  { id: 16, nome: "Parata Impossibile", immagine: require("./assets/card_16.png"), indice: 35.0 },
  { id: 17, nome: "0.1 XG 0 Gol", immagine: require("./assets/card_17.png"), indice: 37.0 },
  { id: 18, nome: "Difesa Assente", immagine: require("./assets/card_18.png"), indice: 39.0 },
  { id: 19, nome: "Possesso Imbarazzante", immagine: require("./assets/card_19.png"), indice: 41.0 },
  { id: 20, nome: "Time Waste", immagine: require("./assets/card_20.png"), indice: 43.0 },
  { id: 21, nome: "Esultanza Intoccabile", immagine: require("./assets/card_21.png"), indice: 45.0 },
  { id: 22, nome: "Pausa Infinita", immagine: require("./assets/card_22.png"), indice: 47.0 },
  { id: 23, nome: "Gol Ridicolo Subito", immagine: require("./assets/card_23.png"), indice: 49.0 },
  { id: 24, nome: "Obiettivo Perso", immagine: require("./assets/card_24.png"), indice: 51.0 },
  { id: 25, nome: "Ritardo Comandi", immagine: require("./assets/card_25.png"), indice: 53.0 },
  { id: 26, nome: "Errore Portiere", immagine: require("./assets/card_26.png"), indice: 55.0 },
  { id: 27, nome: "Modulo Rotto", immagine: require("./assets/card_27.png"), indice: 57.0 },
  { id: 28, nome: "Retrocessione", immagine: require("./assets/card_28.png"), indice: 59.0 },
  { id: 29, nome: "0 XP", immagine: require("./assets/card_29.png"), indice: 61.0 },
  { id: 30, nome: "Rage Quit", immagine: require("./assets/card_30.png"), indice: 63.0 },
  { id: 31, nome: "Pacchetto Orribile", immagine: require("./assets/card_31.png"), indice: 65.0 },
  { id: 32, nome: "Glitch Giocatori", immagine: require("./assets/card_32.png"), indice: 67.0 },
  { id: 33, nome: "Qualificazione Persa", immagine: require("./assets/card_33.png"), indice: 69.0 },
  { id: 34, nome: "Connessione Persa", immagine: require("./assets/card_34.png"), indice: 71.0 },
  { id: 35, nome: "Mbappé Sbaglia Tutto", immagine: require("./assets/card_35.png"), indice: 73.0 },
  { id: 36, nome: "Stadio Vuoto", immagine: require("./assets/card_36.png"), indice: 75.0 },
  { id: 37, nome: "Giocatori Invenduti", immagine: require("./assets/card_37.png"), indice: 77.0 },
  { id: 38, nome: "Giocatori Lenti", immagine: require("./assets/card_38.png"), indice: 79.0 },
  { id: 39, nome: "Obiettivo Fallito", immagine: require("./assets/card_39.png"), indice: 81.0 },
  { id: 40, nome: "Stat Assurde", immagine: require("./assets/card_40.png"), indice: 83.0 },
  { id: 41, nome: "Rewards In Ritardo", immagine: require("./assets/card_41.png"), indice: 85.0 },
  { id: 42, nome: "Multa Ingiusta", immagine: require("./assets/card_42.png"), indice: 87.0 },
  { id: 43, nome: "Giocata Scriptata", immagine: require("./assets/card_43.png"), indice: 89.0 },
  { id: 44, nome: "Perso all’Ultimo Secondo", immagine: require("./assets/card_44.png"), indice: 91.0 },
  { id: 45, nome: "Passaggi Errati", immagine: require("./assets/card_45.png"), indice: 93.0 },
  { id: 46, nome: "Mercato Crash", immagine: require("./assets/card_46.png"), indice: 95.0 },
  { id: 47, nome: "Sfida Annullata", immagine: require("./assets/card_47.png"), indice: 96.0 },
  { id: 48, nome: "Autogol Assurdo", immagine: require("./assets/card_48.png"), indice: 97.0 },
  { id: 49, nome: "Intesa Zero", immagine: require("./assets/card_49.png"), indice: 98.0 },
  { id: 50, nome: "10° Posto Finale", immagine: require("./assets/card_50.png"), indice: 99.5 },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function App() {
  const [fase, setFase] = useState("home");
  const [mano, setMano] = useState([]);
  const [cartaRound, setCartaRound] = useState(null);
  const [vite, setVite] = useState(3);
  const [timer, setTimer] = useState(30);
  const [messaggio, setMessaggio] = useState("");

  const startGame = () => {
    const iniziali = shuffle(CARTE).slice(0, 3).sort((a, b) => a.indice - b.indice);
    setMano(iniziali);
    setVite(3);
    setMessaggio("");
    setFase("gioco");
  };

  const nuovoRound = () => {
    const disponibili = CARTE.filter(c => !mano.find(x => x.id === c.id));
    setCartaRound(shuffle(disponibili)[0]);
    setTimer(30);
    setFase("round");
  };

  const controlla = (c) => {
    const ordine = [...mano, cartaRound].sort((a, b) => a.indice - b.indice);

    if (cartaRound.indice > c.indice) {
      setMano(ordine);
      setMessaggio("Giusto");
    } else {
      setVite(v => v - 1);
      setMessaggio("Sbagliato");
    }

    setFase("risultato");
  };

  useEffect(() => {
    if (fase !== "round") return;

    if (timer === 0) {
      setVite(v => v - 1);
      setMessaggio("Tempo scaduto");
      setFase("risultato");
      return;
    }

    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, fase]);

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

  if (fase === "home") {
    return (
      <SafeAreaView>
        <Text>Gioco della Sfortuna</Text>
        <Button title="Inizia" onPress={startGame} />
      </SafeAreaView>
    );
  }

  if (fase === "gioco") {
    return (
      <SafeAreaView>
        <Text>Carte: {mano.length} / 6</Text>
        <Text>Vite: {vite}</Text>

        {mano.map(c => (
          <Text key={c.id}>{c.nome}</Text>
        ))}

        <Button title="Nuovo Round" onPress={nuovoRound} />
      </SafeAreaView>
    );
  }

  if (fase === "round") {
    return (
      <SafeAreaView>
        <Text>{timer}</Text>
        <Text>{cartaRound?.nome}</Text>

        <Image source={cartaRound?.immagine} style={{ width: 200, height: 120 }} />

        {mano.map(c => (
          <Button key={c.id} title={c.nome} onPress={() => controlla(c)} />
        ))}
      </SafeAreaView>
    );
  }

  if (fase === "risultato") {
    return (
      <SafeAreaView>
        <Text>{messaggio}</Text>
        <Button title="Continua" onPress={() => setFase("gioco")} />
      </SafeAreaView>
    );
  }

  if (fase === "fine") {
    return (
      <SafeAreaView>
        <Text>{messaggio}</Text>
        <Button title="Ricomincia" onPress={() => setFase("home")} />
      </SafeAreaView>
    );
  }

  return null;
}
