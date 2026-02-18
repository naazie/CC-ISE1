import { useEffect, useState } from "react";

const API = "https://cloud-backend-6jrg.onrender.com/api/providers";
// const API = "http://localhost:5000/api/providers";

function Providers() {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({ name: "", model: "IaaS", region: "" });

  useEffect(() => {
    fetch(API)
      .then(res => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then(setProviders)
      .catch(err => console.error("Error loading providers:", err));
  }, []);

  const addProvider = () => {
    if (!form.name || !form.region) return alert("Fill all fields!");

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(p => {
        setProviders([...providers, p]);
        setForm({ name: "", model: "IaaS", region: "" });
      });
  };

  const deleteProvider = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" }).then(() =>
      setProviders(providers.filter(p => p.id !== id))
    );
  };

  return (
    <div className="providers">
      <h2>Cloud Providers (CRUD)</h2>

      <div className="form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <select
          value={form.model}
          onChange={e => setForm({ ...form, model: e.target.value })}
        >
          <option>IaaS</option>
          <option>PaaS</option>
          <option>SaaS</option>
        </select>

        <input
          placeholder="Region"
          value={form.region}
          onChange={e => setForm({ ...form, region: e.target.value })}
        />

        <button className="add-btn" onClick={addProvider}>Add Provider</button>
      </div>

      <ul>
        {providers.map(p => (
          <li key={p.id}>
            {p.name} ({p.model}) – {p.region}
            <button onClick={() => deleteProvider(p.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Providers;
