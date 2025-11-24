import React, { useState } from "react";
import { useEffect } from "react";
import "./Lista.css";

function Lista({ contacts, setContacts }) {
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 404) {
        console.log("Contato removido com sucesso!");

        setContacts(contacts.filter((c) => c.id !== id));
      } else {
        console.log("ID inexistente! Nada foi removido.");
      }
    } catch (error) {
      console.error("Erro ao deletar contato!", error);
    }
  };

  const getContacts = async () => {
    try {
      const response = await fetch("http://localhost:3000/contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Erro ao coletar os contatos!", error);
    }
  };

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setNewName(contact.name);
    setNewPhone(contact.phone);
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
        }),
      });

      const data = await response.json();
      console.log("Contato atualizado:", data);

      setContacts(contacts.map((c) => (c.id === id ? data : c)));

      setEditingId(null);
    } catch (error) {
      console.error("Erro ao atualizar contato!", error);
    }
  };

  return (
    <div className="lista-container">
      <h2>Lista de Contatos</h2>
      {contacts.length === 0 ? (
        <p>Nenhum contato cadastrado.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {editingId === contact.id ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                  <button onClick={() => handleSave(contact.id)}>Salvar</button>
                </>
              ) : (
                <>
                  <span>
                    {contact.name} - {contact.phone}
                  </span>
                  <button onClick={() => handleEdit(contact)}>Editar</button>
                  <button onClick={() => handleDelete(contact.id)}>
                    Excluir
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Lista;
