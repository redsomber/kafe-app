import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppMobile from "./AppMobile";
import { BrowserView, MobileView } from "react-device-detect";
import { AuthContextProvider } from "./context/AuthContext";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <AuthContextProvider>
          <BrowserView>
            <App />
          </BrowserView>
          <MobileView>
            <AppMobile />
          </MobileView>
        </AuthContextProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
