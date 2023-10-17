import GlobalStyle from "./GlobalStyle.tsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </PersistGate>
    </QueryClientProvider>
  </React.StrictMode>
);
