import "./App.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import Store from "./Store";
import AppRoutes from "./Pages/AppRoutes";
import AOS from "aos"; // Removed the @ts-ignore as it is TypeScript-specific
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 800,
      easing: "ease-out",
    });
    AOS.refresh();
  }, []);

  const theme = createTheme({
    focusRing: "auto",
    fontFamily: "Poppins, sans-serif",
    headings: { fontFamily: "Poppins, sans-serif" },
    primaryColor: "brightSun",
    primaryShade: 4,
    colors: {
      // Accent colour; shade 4 matches Tailwind's bright-sun-400
      brightSun: [
        "#eff6ff",
        "#dbeafe",
        "#bfdbfe",
        "#93c5fd",
        "#1d4ed8",
        "#1e40af",
        "#1e40af",
        "#1e3a8a",
        "#172554",
        "#172554",
      ],
    },
  });

  return (
    <Provider store={Store}>
      <MantineProvider defaultColorScheme="light" forceColorScheme="light" theme={theme}>
        <Notifications position="top-center" zIndex={2001} />
        <AppRoutes />
      </MantineProvider>
    </Provider>
  );
}

export default App;
