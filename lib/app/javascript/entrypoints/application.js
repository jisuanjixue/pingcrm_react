import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { Inertia } from "@inertiajs/inertia";
import Plausible from "plausible-tracker";
import axios from "axios";
import theme from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import MainPanel from "../Layouts/MainPanel";
import { createInertiaApp } from "@inertiajs/react";
import { InertiaProgress } from "@inertiajs/progress";
const pages = import.meta.globEagerDefault("../Pages/**/*.tsx");
const plausibleUrl = document.querySelector('meta[name="plausible-url"]')?.content;
if (plausibleUrl) {
    const plausible = Plausible({
        domain: document?.querySelector('meta[name="app-host"]')?.content,
        apiHost: plausibleUrl,
    });
    Inertia.on("navigate", () => {
        plausible.trackPageview();
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const csrfToken = document.querySelector("meta[name=csrf-token]")?.content;
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;
});
InertiaProgress.init();
createInertiaApp({
    resolve: name => {
        const page = pages[`../Pages/${name}.tsx`];
        if (!page)
            throw new Error(`Unknown page ${name}. Is it located under Pages with a .tsx extension?`);
        page.layout = page.layout || MainPanel;
        return page;
    },
    title: title => (title ? `${title} - Ping CRM` : "Ping CRM"),
    setup: ({ el, App, props }) => {
        const root = createRoot(el);
        root.render(_jsx(ChakraProvider, { theme: theme, resetCSS: true, children: _jsx(App, { ...props }) }), el);
    },
});
//# sourceMappingURL=application.js.map