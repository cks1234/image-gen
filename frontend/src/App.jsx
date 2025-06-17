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
        text: prompt,
      });
      setImageUrl(response.data.url);
    } catch (err) {
      console.error('Error generating image:', err);
      alert('Failed to generate image');
    }
    setLoading(false);
  };

  return (
    <div className={`min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="fw-bold">🖼 AI Image Generator</h1>
          <button className="btn btn-outline-light" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="input-group input-group-lg mb-4 shadow-sm">
          <input
            type="text"
            className="form-control"
            placeholder="Describe your image (e.g., a cat flying in space)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="btn btn-primary" onClick={generateImage} disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {imageUrl && (
            <div className={`card bg-transparent border-0 shadow-lg ${darkMode ? 'text-white' : 'text-dark'}`}> 
              <div className="card-body text-center">
              <h5 className="card-title mb-4"> Result</h5>
              <img src={imageUrl} alt="Generated" className="img-fluid rounded" style={{ maxHeight: '600px' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
