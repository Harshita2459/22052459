import React, { useState } from "react";
import axios from "axios";

function App() {
  const [numberType, setNumberType] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchNumbers = async () => {
    if (!["p", "f", "e", "r"].includes(numberType)) {
      setError("Invalid input! Use 'p' (Prime), 'f' (Fibonacci), 'e' (Even), or 'r' (Random).");
      return;
    }

    try {
      setError("");
      const response = await axios.get(`http://localhost:9876/numbers/${numberType}`);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data from the server.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Average Calculator</h2>
      <input
        type="text"
        placeholder="Enter p, f, e, or r"
        value={numberType}
        onChange={(e) => setNumberType(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={fetchNumbers} style={{ padding: "5px 10px" }}>
        Get Numbers
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
          <p><strong>Previous Window State:</strong> {JSON.stringify(data.windowPrevState)}</p>
          <p><strong>Current Window State:</strong> {JSON.stringify(data.windowCurrState)}</p>
          <p><strong>Fetched Numbers:</strong> {JSON.stringify(data.numbers)}</p>
          <p><strong>Average:</strong> {data.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;