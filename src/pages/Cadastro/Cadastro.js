import React, { useState } from "react";
import "./Cadastro.css";

function Cadastro({ contacts, setContacts }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      const data = await response.json();
      console.log("Contato criado:", data);

      setContacts([...contacts, data]);
      setName("");
      setPhone("");
    } catch (error) {
      console.error("Erro ao adicionar contato!", error);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastrar Contato</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default Cadastro;
