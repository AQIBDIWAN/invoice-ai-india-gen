
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log("main.jsx loading");

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found!");
}
