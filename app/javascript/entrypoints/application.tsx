// This file is automatically compiled by Vite, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React from "react";
import { render } from "react-dom";

import { Inertia } from "@inertiajs/inertia";
import Plausible from "plausible-tracker";
import axios from "axios";
import theme from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";

import { createInertiaApp } from "@inertiajs/inertia-react";
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
    console.log("🚀 ~ file: application.jsx ~ line 42 ~ page", page);
    if (!page) throw new Error(`Unknown page ${name}. Is it located under Pages with a .tsx extension?`);
    return page;
  },

  title: title => (title ? `${title} - Ping CRM` : "Ping CRM"),

  setup: ({ el, App, props }) => {
    render(
      <ChakraProvider theme={theme} resetCSS={false}>
        <App {...props} />
      </ChakraProvider>,
      el
    );
  },
});
