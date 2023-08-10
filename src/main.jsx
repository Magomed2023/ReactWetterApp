import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Weather from './Weather.jsx';



// Zunächst müssen die entsprechenden Komponenten/Funktionen importiert werden

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// Es folgt die Definition der routes

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/:lat/:lng",
    element: <Weather />,
  },
]);

// Und weiter unten in der render Funktion muss die App-Komponente durch den RouterProvider ausgetauscht werden, 
// damit nicht immer die App-Komponente gerendert wird, sondern der Router entscheiden kann, weas angezeigt wird

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);



