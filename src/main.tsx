import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme.colors.card,
            color: theme.colors.text,
            borderRadius: theme.borderRadius.button,
          },
          success: {
            iconTheme: {
              primary: theme.colors.status.success,
              secondary: theme.colors.white,
            },
          },
          error: {
            iconTheme: {
              primary: theme.colors.status.error,
              secondary: theme.colors.white,
            },
          },
        }}
      />
    </ThemeProvider>
  </StrictMode>
);
