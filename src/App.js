import React, { useState, useEffect } from "react";

const usuarios = {
  "Bia": "1234",
  "Fabio": "4321",
  "Rosana": "5678",
  "Amigos": "8765"
};

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [loginForm, setLoginForm] = useState({ usuario: "", senha: "" });
  const [musicas, setMusicas] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    grupo: "",
    romanizado: "",
    portugues: "",
    ingles: "",
  });
  const [filtro, setFiltro] = useState("");

  // Carregar músicas do localStorage do usuário logado
  useEffect(() => {
    if (usuarioLogado) {
      const saved = localStorage.getItem(`musicas_${usuarioLogado}`);
      setMusicas(saved ? JSON.parse(saved) : []);
    }
  }, [usuarioLogado]);

  // Salvar músicas no localStorage
  useEffect(() => {
    if (usuarioLogado) {
      localStorage.setItem(`musicas_${usuarioLogado}`, JSON.stringify(musicas));
    }
  }, [musicas, usuarioLogado]);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { usuario, senha } = loginForm;
    if (usuarios[usuario] && usuarios[usuario] === senha) {
      setUsuarioLogado(usuario);
      setLoginForm({ usuario: "", senha: "" });
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.titulo.trim() === "") return;
    setMusicas([...musicas, form]);
    setForm({ titulo: "", grupo: "", romanizado: "", portugues: "", ingles: "" });
  };

  const handleDelete = (index) => {
    const novas = musicas.filter((_, i) => i !== index);
    setMusicas(novas);
  };

  const musicasFiltradas = filtro
    ? musicas.filter((m) => m.grupo.toLowerCase() === filtro.toLowerCase())
    : musicas;

  const rosaCards = ["#ffe4e6", "#ffc0cb", "#ffb6c1", "#ff69b4", "#ff1493"];

  if (!usuarioLogado) {
    // Tela de login
    return (
      <div style={{ padding: "20px", fontFamily: "'Segoe UI', sans-serif", background: "#ffe4f0", minHeight: "100vh" }}>
        <h1 style={{ textAlign: "center", color: "#d63384", fontSize: "2.5em", marginBottom: "25px" }}>Login</h1>
        <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "95%", margin: "0 auto", padding: "20px", background: "#ffd6e8", borderRadius: "20px", boxShadow: "0 6px 12px rgba(0,0,0,0.1)" }}>
          <input name="usuario" placeholder="Nome" value={loginForm.usuario} onChange={handleLoginChange} style={{ padding: "14px", borderRadius: "12px", border: "1px solid #f48fb1", fontSize: "1em" }} />
          <input name="senha" placeholder="Senha" type="password" value={loginForm.senha} onChange={handleLoginChange} style={{ padding: "14px", borderRadius: "12px", border: "1px solid #f48fb1", fontSize: "1em" }} />
          <button type="submit" style={{ padding: "14px", border: "none", borderRadius: "15px", backgroundColor: "#d63384", color: "white", fontWeight: "bold", fontSize: "1.1em", cursor: "pointer" }}>Entrar</button>
        </form>
      </div>
    );
  }

  // Tela do app
  return (
    <div style={{ padding: "15px", fontFamily: "'Segoe UI', sans-serif", background: "#ffe4f0", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#d63384", fontSize: "2.5em", marginBottom: "15px" }}>Minhas Letras de Música</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <b>Usuário:</b> {usuarioLogado} {" "}
        <button onClick={() => setUsuarioLogado(null)} style={{ padding: "6px 12px", border: "none", borderRadius: "10px", backgroundColor: "#ff1493", color: "white", cursor: "pointer" }}>Sair</button>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "95%", margin: "0 auto 20px auto", padding: "20px", background: "#ffd6e8", borderRadius: "20px", boxShadow: "0 6px 12px rgba(0,0,0,0.1)" }}>
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} style={{ padding: "14px", borderRadius: "12px", border: "1px solid #f48fb1", fontSize: "1em" }} />
        <input name="grupo" placeholder="Grupo" value={form.grupo} onChange={handleChange} style={{ padding: "14px", borderRadius: "12px", border: "1px solid #f48fb1", fontSize: "1em" }} />
        <input name="romanizado" placeholder="Romanizado" value={form.romanizado} onChange={handleChange} style={{ padding: "14px", borderRadius: "12px", border: "1px solid #f48fb1", fontSize: "1em" }} />
        <input name="portugues" placeholder="Português" value={form.portugues} onChange={handleChange} style={{ padding: "14px", borderRadius: "12px", border: "1px solid #f48fb1", fontSize: "1em" }} />
        <input name="ingles" placeholder="Inglês" value={form.ingles} onChange={handleChange} style={{ padding: "14px", borderRadius: "12px", border: "1px solid #f48fb1", fontSize: "1em" }} />
        <button type="submit" style={{ padding: "14px", border: "none", borderRadius: "15px", backgroundColor: "#d63384", color: "white", fontWeight: "bold", fontSize: "1.1em", cursor: "pointer" }}>Adicionar Música</button>
      </form>

      {/* Filtro */}
      <div style={{ maxWidth: "95%", margin: "0 auto 20px auto", textAlign: "center" }}>
        <input
          placeholder="Filtrar por grupo"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ padding: "12px", borderRadius: "12px", border: "1px solid #d63384", width: "100%", fontSize: "1em" }}
        />
      </div>

      {/* Lista de músicas */}
      <ul style={{ maxWidth: "95%", margin: "0 auto", padding: 0, listStyle: "none", overflowY: "auto", maxHeight: "60vh" }}>
        {musicasFiltradas.map((m, i) => (
          <li key={i} style={{ background: rosaCards[i % rosaCards.length], marginBottom: "15px", padding: "18px", borderRadius: "18px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", fontSize: "1.1em" }}>
            <b>{m.titulo}</b> {m.grupo && `(${m.grupo})`}<br />
            <b>Romanizado:</b> {m.romanizado} <br />
            <b>Português:</b> {m.portugues} <br />
            <b>Inglês:</b> {m.ingles} <br />
            <button onClick={() => handleDelete(i)} style={{ marginTop: "12px", padding: "8px 16px", border: "none", borderRadius: "12px", backgroundColor: "#ff1493", color: "white", fontSize: "1em", cursor: "pointer" }}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
