import type { ReactNode } from 'react';
import React from 'react';
import { useRef } from 'react';

export default (): [(content: string) => void, ReactNode] => {
  const refIFrame = useRef<HTMLIFrameElement | undefined | null>();

  const onPrint = (content: string) => {
    if (!refIFrame.current) return;

    const iframeWindow = refIFrame.current.contentWindow;

    if (!iframeWindow) {
      return;
    }

    const iframeDocument = iframeWindow.document;
    iframeDocument.body.innerHTML = content || '';
    iframeWindow.print();
  };

  return [
    onPrint,
    <iframe
      style={{ display: 'none' }}
      ref={(elm) => {
        refIFrame.current = elm;
      }}
    />,
  ];
};
