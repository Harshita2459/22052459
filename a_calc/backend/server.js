const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 9876;
app.use(cors());

const WINDOW_SIZE = 10;
let numberWindow = [];

const API_URLS = {
  p: "http://20.244.56.144/evaluation-service/primes",
  f: "http://20.244.56.144/evaluation-service/fibo",
  e: "http://20.244.56.144/evaluation-service/even",
  r: "http://20.244.56.144/evaluation-service/rand"
};

app.get("/numbers/:type", async (req, res) => {
  const type = req.params.type;
  if (!API_URLS[type]) {
    return res.status(400).json({ error: "Invalid number type. Use 'p', 'f', 'e', or 'r'." });
  }

  let previousState = [...numberWindow];
  let fetchedNumbers = [];

  try {
    const response = await Promise.race([
      axios.get(API_URLS[type]),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 500))
    ]);
    fetchedNumbers = response.data.numbers;
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch numbers or timeout exceeded." });
  }

  fetchedNumbers.forEach(num => {
    if (!numberWindow.includes(num)) {
      if (numberWindow.length >= WINDOW_SIZE) {
        numberWindow.shift();
      }
      numberWindow.push(num);
    }
  });

  const average = numberWindow.length > 0 ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2) : 0;

  res.json({
    windowPrevState: previousState,
    windowCurrState: numberWindow,
    numbers: fetchedNumbers,
    avg: parseFloat(average)
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));