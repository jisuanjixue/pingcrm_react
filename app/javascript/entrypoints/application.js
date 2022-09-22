// This file is automatically compiled by Vite, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import '~/styles/application.css';

import React from 'react';
import { render } from 'react-dom';

import { Inertia } from '@inertiajs/inertia';
import Plausible from 'plausible-tracker';

import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';

const plausibleUrl = document.querySelector(
  'meta[name="plausible-url"]',
).content;
if (plausibleUrl) {
  const plausible = Plausible({
    domain: document.querySelector('meta[name="app-host"]').content,
    apiHost: plausibleUrl,
  });

  Inertia.on('navigate', () => {
    plausible.trackPageview();
  });
}

InertiaProgress.init();

const pages = import.meta.globEagerDefault('../Pages/**/*.tsx');

createInertiaApp({
  resolve: (name) => {
    const component = pages[`../Pages/${name}.tsx`];
    if (!component)
      throw new Error(
        `Unknown page ${name}. Is it located under Pages with a .tsx extension?`,
      );

    return import(`./Pages/${name}`);
  },

  title: (title) => (title ? `${title} - Ping CRM` : 'Ping CRM'),

  setup({ el, App, props }) {
    render(
      <ChakraProvider theme={theme} resetCSS={false}>
        <App {...props} />
      </ChakraProvider>,
      el,
    );
  },
});
