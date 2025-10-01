import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './Redux/Store'


// Appliquer zoom sur le root avant de monter React
const rootElement = document.getElementById('root');
if (rootElement) {
  rootElement.style.zoom = '75%'; // 75% zoom
  // Alternative compatible avec tous les navigateurs :
  // rootElement.style.transform = 'scale(0.75)';
  // rootElement.style.transformOrigin = 'top left';
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
