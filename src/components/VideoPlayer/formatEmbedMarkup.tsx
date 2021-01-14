
/**
 * via https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/#a-better-way
 * Convert a template string into HTML DOM nodes
 * @param  {String} string The template string
 * @return {Node}       The template HTML
 */
function convertStringToNode(string: string): HTMLElement {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, 'text/html');
  // get the body, will return <body> around your code
  return doc.body;
}
function formatEmbedMarkup(
  embedHTML: string,
  enableAutoplay: boolean,
  playthrough: boolean,
): string {
  if (embedHTML) {
    const embedHTMLWithPlayStatus = convertStringToNode(embedHTML).querySelector('div');

    if (enableAutoplay) {
      embedHTMLWithPlayStatus.setAttribute('data-autoplay', 'true');
      embedHTMLWithPlayStatus.setAttribute('data-muted', 'true');
    }

    if (playthrough) {
      embedHTMLWithPlayStatus.setAttribute('data-playthrough', 'true');
    }

    return embedHTMLWithPlayStatus.outerHTML;
  }

  // if falsy (empty string, undefined, or null), return empty string
  // possibly throw an error
  return '';
}

export default formatEmbedMarkup;
