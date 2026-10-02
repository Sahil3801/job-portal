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

function App() {
  const theme = createTheme({
    focusRing: "auto",
    fontFamily: "Poppins, sans-serif",
    headings: { fontFamily: "Poppins, sans-serif" },
    primaryColor: "brightSun",
    primaryShade: 4,
    colors: {
      // Accent colour (black); shade 4 matches Tailwind's bright-sun-400
      brightSun: [
        "#f3f4f6",
        "#e5e7eb",
        "#d1d5db",
        "#9ca3af",
        "#111111",
        "#111111",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
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
