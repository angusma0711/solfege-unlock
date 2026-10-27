import React from 'react';
import { createRoot } from 'react-dom/client';
import { SolfegePage } from './game/SolfegePage';
import './style.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><SolfegePage/></React.StrictMode>);
