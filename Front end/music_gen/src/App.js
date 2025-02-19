import React, { useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
  // State to store user inputs
  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("");
  const [location, setLocation] = useState("");
  const [lyrics, setLyrics] = useState("");

  // Function to generate lyrics (placeholder logic)
  const generateLyrics = () => {
    const generatedLyrics = `🎵 On the topic of ${topic}, 
In a ${mood} mood, 
Here in ${location}, 
We sing this tune... 🎤

Verse 1:
In ${location}, where the ${topic} thrives,
Under ${mood} skies, our dreams come alive.
With every beat, our hearts align,
A melody of ${topic}, so divine.

Chorus:
Oh ${topic}, in ${location} we stand,
With ${mood} hearts, we make our stand.
This song of ${topic}, forever true,
In ${location}, we sing for you! 🎤`;

    setLyrics(generatedLyrics);
  };

  const cancel = () => {
    setLyrics("");
  };

  return (
    <div className="container mt-5 "  >
      <img src="https://wall.alphacoders.com/big.php?i=218994"></img>
      <header>
      <h1 className="text-center text-primary">🎤 Song Generator 🎵</h1>
      </header>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="topic" className="form-label">
              Topic
            </label>
            <input
              type="text"
              className="form-control"
              id="topic"
              placeholder="e.g., Love, Nature, Adventure"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mood" className="form-label">
              Mood
            </label>
            <input
              type="text"
              className="form-control"
              id="mood"
              placeholder="e.g., Happy, Sad, Energetic"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="e.g., Paris, Beach, Mountains"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <center>
          <button
            className="btn btn-success w-50"
            onClick={generateLyrics}
          >
            Generate Song Lyrics
          </button> </center>
        </div>
      </div>

      {/* Display Generated Lyrics */}
      {lyrics && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">🎵 Your Song Lyrics 🎤</h5>
                <pre className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                  {lyrics}
                </pre>
              </div>
            </div>
            <center>
            <button
            className="btn btn-secondary w-40  my-3 "
            onClick={cancel}
          >
            Cancel
          </button></center>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default App;