import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <GoogleOAuthProvider clientId="308282225128-c3a30sit5vsidfs9saavdh2017qfg0b5.apps.googleusercontent.com"> */}
        <App />
        <Toaster position="top-center" />
        {/* </GoogleOAuthProvider> */}
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
