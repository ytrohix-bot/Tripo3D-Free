"use client";
import { useState } from 'react';
import '@google/model-viewer';

export default function TripoClone() {
  const [loading, setLoading] = useState(false);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/generate', { method: 'POST', body: formData });
    const blob = await res.blob();
    
    // Create a temporary URL for the 3D file to show in the viewer
    setModelUrl(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
      <h1>AI 3D Generator</h1>
      <input type="file" onChange={handleUpload} accept="image/*" />
      
      {loading && <p>Generating your 3D model... this takes ~10 seconds.</p>}

      {modelUrl && (
        <model-viewer 
          src={modelUrl} 
          auto-rotate 
          camera-controls 
          style={{ width: '600px', height: '400px', background: '#eee' }}
        ></model-viewer>
      )}
    </div>
  );
}
