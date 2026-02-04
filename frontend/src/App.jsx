import { useEffect, useState } from "react";

function App() {
  const [services, setServices] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    fetch("http://localhost:5000/api/cloud")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const viewDetails = (type) => {
    setLoading(true); // Start loading
    fetch(`http://localhost:5000/api/cloud/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails({ type, ...data });
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching details:", err);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1>Cloud Service Models</h1>

      {/* Hide the list when showing details to keep the UI clean */}
      {!details ? (
        <div className="cards">
          {services.map((service, index) => (
            <div key={index} className="card">
              <div>
                <h2>{service.type}</h2>
                <p>{service.description}</p>
                <p>
                  <strong>Examples:</strong> {service.examples.join(", ")}
                </p>
              </div>
              <button disabled={loading} onClick={() => viewDetails(service.type)}>
                {loading ? "Loading..." : "View Details"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Detailed View Section */
        <div className="card details">
          <h2>{details.type} – Details</h2>
          <p><strong>Users:</strong> {details.users}</p>
          <p><strong>Features:</strong></p>
          <ul>
            {details.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <button onClick={() => setDetails(null)}>Back to List</button>
        </div>
      )}
    </div>
  );
}

export default App;