import { useEffect, useState } from "react";
import Providers from "./Providers";

function App() {
  const [services, setServices] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://cloud-backend-6jrg.onrender.com/api/cloud")
      .then(res => res.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  const viewDetails = (type) => {
    setLoading(true);
    fetch(`https://cloud-backend-6jrg.onrender.com/api/cloud/${type}`)
      .then(res => res.json())
      .then(data => {
        setDetails({ type, ...data });
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1>Cloud Service Models</h1>

      {!details ? (
        <div className="cards">
          {services.map((service, i) => (
            <div key={i} className="card">
              <h2>{service.type}</h2>
              <p>{service.description}</p>
              <p><b>Examples:</b> {service.examples.join(", ")}</p>
              <button disabled={loading} onClick={() => viewDetails(service.type)}>
                {loading ? "Loading..." : "View Details"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card details">
          <h2>{details.type} – Details</h2>
          <p><b>Users:</b> {details.users}</p>
          <ul>
            {details.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <button onClick={() => setDetails(null)}>Back</button>
        </div>
      )}

      {/* CRUD Section */}
      <Providers />
    </div>
  );
}

export default App;
