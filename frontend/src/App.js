import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/generate', {
        text: prompt
      });
      setImageUrl(response.data.url);
    } catch (err) {
      console.error('Error generating image:', err);
      alert('Failed to generate image');
    }
    setLoading(false);
  };

  return (
    <div className={`min-vh-100 py-5 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">🖼 AI Image Generator</h1>
          <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="example: a cat flying in space"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={generateImage}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generated'}
          </button>
        </div>

        {imageUrl && (
          <div className="card bg-secondary text-white shadow">
            <div className="card-body text-center">
              <h5 className="card-title">🎨 Generated Image</h5>
              <img src={imageUrl} alt="Generated" className="img-fluid rounded" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
