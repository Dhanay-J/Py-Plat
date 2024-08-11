import { StrictMode } from "react";
// import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  </StrictMode>
);
