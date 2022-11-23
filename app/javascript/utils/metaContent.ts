export const metaContent = (name: string): string | undefined => {
  const element: HTMLMetaElement | null = document.head.querySelector(
    `meta[name="${name}"]`,
  );

  if (element) return element.content;
}

export const assetUrl = (fileName: string): string => {
  const assetHost = metaContent('asset-host') || '';

  return assetHost + fileName;
}
