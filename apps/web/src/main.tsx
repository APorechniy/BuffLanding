import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Confirm from './pages/Confirm';

import { BrowserRouter, Routes, Route } from "react-router";

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/confirm" element={<Confirm />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)