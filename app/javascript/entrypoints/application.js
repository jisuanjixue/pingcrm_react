// This file is automatically compiled by Vite, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React from "react";
import { createRoot } from "react-dom/client";

import { Inertia } from "@inertiajs/inertia";
import Plausible from "plausible-tracker";
import axios from "axios";

import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";

const plausibleUrl = document?.querySelector('meta[name="plausible-url"]').content;
if (plausibleUrl) {
  const plausible = Plausible({
    domain: document?.querySelector('meta[name="app-host"]').content,
    apiHost: plausibleUrl,
  });

  Inertia.on("navigate", () => {
    plausible.trackPageview();
  });
}

// document.addEventListener("DOMContentLoaded", () => {
//   const csrfToken = document.querySelector("meta[name=csrf-token]").content;
//   axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;
// });

InertiaProgress.init();

const pages = import.meta.globEagerDefault("../Pages/**/*.tsx");
console.log("🚀 ~ file: application.js ~ line 36 ~ pages", pages);
const root = createRoot(document.getElementById("root"));

createInertiaApp({
  resolve: name => {
    const component = pages[`../Pages/${name}.tsx`];
    if (!component) throw new Error(`Unknown page ${name}. Is it located under Pages with a .tsx extension?`);

    return component;
  },

  title: title => (title ? `${title} - Ping CRM` : "Ping CRM"),

  setup: ({ el, App, props }) => root.render(<App {...props} />, el),
});
