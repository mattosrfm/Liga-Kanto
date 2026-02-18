import { useState } from "react";

export default function Home() {
  const [jogadores, setJogadores] = useState([]);
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");

  function adicionarJogador() {
    if (!nome) return;
    setJogadores([...jogadores, { nome, imagem, vitorias: 0, derrotas: 0 }]);
    setNome("");
    setImagem("");
  }

  function marcarResultado(index, tipo) {
    const copia = [...jogadores];
    if (tipo === "vitoria") copia[index].vitorias++;
    if (tipo === "derrota") copia[index].derrotas++;
    setJogadores(copia);
  }

  const ranking = [...jogadores].sort((a, b) => b.vitorias - a.vitorias);

  return (
    <div style={{ padding: 20, background: "#c62828", minHeight: "100vh", color: "white" }}>
      <h1>📕 Liga de Kanto 2.0</h1>

      <input
        placeholder="Nome do treinador"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        placeholder="URL imagem Pokémon"
        value={imagem}
        onChange={(e) => setImagem(e.target.value)}
      />
      <button onClick={adicionarJogador}>Adicionar</button>

      {jogadores.map((j, i) => (
        <div key={i} style={{ background: "white", color: "black", padding: 10, marginTop: 10 }}>
          {j.imagem && <img src={j.imagem} width="80" />}
          <h3>{j.nome}</h3>
          <p>🏆 {j.vitorias} | ❌ {j.derrotas}</p>
          <button onClick={() => marcarResultado(i, "vitoria")}>Vitória</button>
          <button onClick={() => marcarResultado(i, "derrota")}>Derrota</button>
        </div>
      ))}

      <h2>🏆 Ranking</h2>
      {ranking.map((j, i) => (
        <p key={i}>{i + 1}º - {j.nome} ({j.vitorias} vitórias)</p>
      ))}
    </div>
  );
}
