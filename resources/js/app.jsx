import "./bootstrap";
import "../css/app.scss";
// import '../css/custom.css'
import "../css/custom.scss";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-loading-skeleton/dist/skeleton.css";

// react table
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import "primeicons/primeicons.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeTabProvider } from "./context/ThemeTabContext";
import { PrimeReactProvider } from "primereact/api";
import ReactGA from "react-ga4";

// Create a client
const queryClient = new QueryClient();

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
ReactGA.initialize(import.meta.env.VITE_G4_TOKEN);

createInertiaApp({
    title: (title) => `${title}${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // Track initial page load
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });

        root.render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <ThemeTabProvider>
                        <PrimeReactProvider>
                            <App {...props} />
                        </PrimeReactProvider>
                    </ThemeTabProvider>
                </ThemeProvider>
            </QueryClientProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
