// This file is automatically compiled by Vite, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React from "react";
import { createRoot } from "react-dom/client";
import snakecaseKeys from "snakecase-keys";

import { router } from "@inertiajs/react";
import Plausible from "plausible-tracker";
import axios from "axios";
import MainPanel from "@/Layouts/MainPanel";

import { createInertiaApp } from "@inertiajs/react";
// import '../utils/setupHoneybadger.ts';

const pages = import.meta.globEagerDefault("../Pages/**/*.tsx");

const plausibleUrl = document.querySelector('meta[name="plausible-url"]')?.content;
if (plausibleUrl) {
  const plausible = Plausible({
    domain: document?.querySelector('meta[name="app-host"]')?.content,
    apiHost: plausibleUrl,
  });

  router.on("navigate", () => {
    plausible.trackPageview();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const csrfToken = document.querySelector("meta[name=csrf-token]")?.content;
  axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;
});

axios.defaults.transformRequest = [data => snakecaseKeys(data, { deep: true }), ...axios.defaults.transformRequest];

createInertiaApp({
  resolve: name => {
    const page = pages[`../Pages/${name}.tsx`];
    if (!page) throw new Error(`Unknown page ${name}. Is it located under Pages with a .tsx extension?`);
    page.layout = page.layout || MainPanel;
    return page;
  },

  title: title => (title ? `${title} - Ping CRM` : "Ping CRM"),

  setup: ({ el, App, props }) => {
    createRoot(el).render(<App {...props} />)
  }
});
