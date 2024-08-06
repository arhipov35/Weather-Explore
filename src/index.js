import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./Main";
import Header from "./Components/Header";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { OnboardingProvider } from "./OnboardingContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OnboardingProvider>
      <Provider store={store}>
        <Header />
        <Main />
      </Provider>
    </OnboardingProvider>
  </React.StrictMode>
);
