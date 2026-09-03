import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply theme from localStorage or system preference before first paint.
// Storage access throws when site data is blocked, so it must never be the thing
// that stops the page from rendering.
let stored: string | null = null;
try {
  stored = localStorage.getItem("theme");
} catch {
  stored = null;
}

if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
  document.documentElement.style.colorScheme = "dark";
} else {
  document.documentElement.style.colorScheme = "light";
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
