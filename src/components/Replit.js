import React, { useState } from "react";
import axios from "axios";
import "./Replit.css"

const Replit = () => {
  const [origin, setOrigin] = useState("SYD");
  const [destination, setDestination] = useState("JFK");
  const [cabin, setCabin] = useState("economy");
  const [results, setResults] = useState(null);
  const [departureTimeFrom, setDepartureTimeFrom] = useState("");
  const [departureTimeTo, setDepartureTimeTo] = useState("");

  const origins = ["JFK", "DEL", "SYD", "BOM", "BNE", "BLR"];
  const destinations = ["JFK", "DEL", "SYD", "LHR", "CDG", "DOH", "SIN"];
  const cabins = ["Economy", "Business", "First"];

  const handleSearch = async () => {
    const headers = {
      accept: "application/json, text/plain, /",
      "accept-language": "en-US,en;q=0.9,hi;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    };
    const json_data = {
      origin: origin,
      destination: destination,
      partnerPrograms: [
        "Air Canada",
        "United Airlines",
        "KLM",
        "Qantas",
        "American Airlines",
        "Etihad Airways",
        "Alaska Airlines",
        "Qatar Airways",
        "LifeMiles",
      ],
      stops: 2,
      departureTimeFrom: "2024-07-09",
      departureTimeTo: "2024-10-07",
      isOldData: false,
      limit: 302,
      offset: 0,
      cabinSelection: [cabin],
      date: "2024-07-09T12:00:17.796Z",
    };

    try {
      const response = await axios.post(
        "https://cardgpt.in/apitest",
        json_data,
        { headers }
      );
      setResults(response.data.data);
      console.log(results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
    setDepartureTimeFrom(json_data.departureTimeFrom);
    setDepartureTimeTo(json_data.departureTimeTo);
  };

  return (
    <div className="App">
      <h5 style={{ color: "white" }}>
        Choose Origin & Destination Airports :{" "}
      </h5>
      <div className="form">
        <div className="drop-down">
          <label style={{ fontSize: "small" }}>Origin</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
            {origins.map((orig) => (
              <option key={orig} value={orig}>
                {orig}
              </option>
            ))}
          </select>
        </div>
        <div className="drop-down">
          <label>Destination</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {destinations.map((dest) => (
              <option key={dest} value={dest}>
                {dest}
              </option>
            ))}
          </select>
        </div>
        <div className="drop-down-cabin">
          <label>Cabin Section</label>
          <select value={cabin} onChange={(e) => setCabin(e.target.value)}>
            {cabins.map((cab) => (
              <option key={cab} value={cab}>
                {cab}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSearch} className="btn">
          Search
        </button>
      </div>

      {results && (
        <div className="results">
          {results.length === 0 ? (
            <p>Try another search route.</p>
          ) : (
            results.map((result, index) => (
              <div key={index} className="result">
                <img src="dummy_logo.png" alt="Airline Logo" className="logo" />
                <div>
                  <p>{result.partner_program}</p>
                  <p>{`${origin}->${destination}`}</p>
                  <p className="date">{`${departureTimeFrom} - ${departureTimeTo}`}</p>
                  <p>
                    {" "}
                    {result.min_business_miles || "N/A"}
                    <br />
                    <span className="font">Min Business Miles</span>
                  </p>
                  <p>
                    {result.min_economy_miles || "N/A"}
                    <br />
                    <span className="font">Min Economy Miles</span>
                  </p>
                  <p>
                    {" "}
                    {result.min_first_miles || "N/A"}
                    <br />
                    <span className="font">Min First Miles</span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Replit;