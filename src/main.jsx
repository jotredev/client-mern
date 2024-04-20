import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

// Quill editor
import "react-quill/dist/quill.snow.css";

// React datepicker
import "react-day-picker/dist/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster />
    <App />
  </BrowserRouter>
);
