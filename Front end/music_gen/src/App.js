import React, { useState } from 'react';
import './App.css'; // Import CSS for styling
import Client from './client';

function App() {
  const [formData, setFormData] = useState({
    theme: '',
    storyline: '',
    mood: '',
    location: '',
  });

  const [lyrics, setLyrics] = useState('');
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('lyricsHistory')) || []
  );
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateLyrics = async () => {
    const { theme, storyline, mood, location } = formData;

    if (!theme || !storyline || !mood || !location) {
      alert('Please fill all the fields!');
      return;
    }

    setIsLoading(true); // Start loader

    try {
      // Call the API using the Client function
      const clientResponse = await Client(formData, "POST");

      // Extract the song from the response
      const generatedSong = clientResponse.song;

      // Store the generated song in local storage
      localStorage.setItem('lastGeneratedSong', generatedSong);

      // Update the lyrics state
      setLyrics(generatedSong);

      // Create a template for history
      const lyricsTemplate = `
        Theme: ${theme}
        Storyline: ${storyline}
        Mood: ${mood}
        Location: ${location}

        ${generatedSong}
      `;

      // Update history
      const newHistory = [
        { id: Date.now(), theme: theme, lyrics: lyricsTemplate },
        ...history,
      ];
      setHistory(newHistory);
      localStorage.setItem('lyricsHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error generating lyrics:', error);
      alert('Failed to generate lyrics. Please try again.');
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  const handleCancel = () => {
    setLyrics('');
  };

  const viewHistoryLyrics = (lyrics) => {
    setLyrics(lyrics);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <h1 className="app-title">🎵 Song Lyrics Generator 🎵</h1>
        <button
          className="history-button"
          onClick={() => setShowHistory(!showHistory)}
        >
          History
        </button>
      </header>

      {/* History Modal */}
      {showHistory && (
        <div className="history-modal">
          <h2 className="text-success">History</h2>
          <ul>
            {history.map((item) => (
              <li key={item.id} onClick={() => viewHistoryLyrics(item.lyrics)}>
                {item.theme}
              </li>
            ))}
          </ul>
          <button
            className="close-history"
            onClick={() => setShowHistory(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side: Input Fields */}
        <div className="input-section">
          <input
            type="text"
            name="theme"
            placeholder="Theme (e.g., vintage)"
            value={formData.theme}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="storyline"
            placeholder="Storyline (e.g., song in pottery making)"
            value={formData.storyline}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="mood"
            placeholder="Mood (e.g., happy)"
            value={formData.mood}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Tamil Nadu)"
            value={formData.location}
            onChange={handleChange}
            className="input-field"
          />
          <button
            onClick={generateLyrics}
            className="generate-button"
            disabled={isLoading} // Disable button during API call
          >
            {isLoading ? 'Generating...' : 'Generate Lyrics'}
          </button>
        </div>

        {/* Right Side: Generated Lyrics */}
        <div className="lyrics-section">
          {isLoading ? (
            <div className="loader">
              <p>Loading...</p>
              <div className="spinner"></div>
            </div>
          ) : lyrics ? (
            <>
              <h2 className="lyrics-title">Generated Lyrics</h2>
              <pre className="lyrics-text">{lyrics}</pre>
              <button
                onClick={() => {
                  setShowHistory(false);
                  handleCancel();
                  setFormData({
                    theme: '',
                    storyline: '',
                    mood: '',
                    location: '',
                  });
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="empty">
              <p className="text-muted">Your lyrics will appear here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;