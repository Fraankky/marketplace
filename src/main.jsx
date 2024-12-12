import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { reducers } from "./storeRedux/store.js";

const globalStore = legacy_createStore(reducers);

createRoot(document.getElementById("root")).render(
  <Provider store={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);