import React, { useState } from "react";
import axios from "axios";

const AverageCalculator = () => {
  const [numberType, setNumberType] = useState("e");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${numberType}`);
      setResponseData(response.data);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>Average Calculator</h2>
      <input
        type="text"
        value={numberType}
        onChange={(e) => setNumberType(e.target.value)}
        placeholder="Enter type (p, f, e, r)"
        style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
      />
      <button onClick={fetchNumbers} disabled={loading} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        {loading ? "Fetching..." : "Get Numbers"}
      </button>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {responseData && (
        <div style={{ padding: "10px", backgroundColor: "#f9f9f9", marginTop: "10px", borderRadius: "5px" }}>
          <h3>Response Data</h3>
          <p><strong>Previous Window:</strong> {JSON.stringify(responseData.windowPrevState)}</p>
          <p><strong>Current Window:</strong> {JSON.stringify(responseData.windowCurrState)}</p>
          <p><strong>Fetched Numbers:</strong> {JSON.stringify(responseData.numbers)}</p>
          <p><strong>Average:</strong> {responseData.avg}</p>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;