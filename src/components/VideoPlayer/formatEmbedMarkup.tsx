/**
 * Convert a template string into HTML DOM nodes
 * via https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/#a-better-way
 * @param  {String} string The template string
 * @return {Node} The template HTML
 */
function convertStringToNode(string: string): HTMLElement {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, 'text/html');
  // get the body, will return <body> around your code
  return doc.body;
}

/**
 * Adds properties related to the video based on video settings
 * @param {string} embedHTML is html that has powa info
 * @param {boolean} enableAutoplay sets video to autoplay
 * @param {boolean} playthrough sets video to continue playing through
 * @param {number} overrideAspectRatio overrides aspect ratio. Could be undefined
 */
function formatEmbedMarkup(
  embedHTML: string,
  enableAutoplay: boolean,
  playthrough: boolean,
  overrideAspectRatio?: number,
): string {
  if (embedHTML) {
    const embedHTMLWithPlayStatus = convertStringToNode(embedHTML);

    if (enableAutoplay) {
      // powa is guaranteed to be in the embedHTML, according to Powa team
      embedHTMLWithPlayStatus.querySelector('.powa').setAttribute('data-autoplay', 'true');
      embedHTMLWithPlayStatus.querySelector('.powa').setAttribute('data-muted', 'true');
    }

    if (playthrough) {
      embedHTMLWithPlayStatus.querySelector('.powa').setAttribute('data-playthrough', 'true');
    }

    if (overrideAspectRatio) {
      embedHTMLWithPlayStatus.querySelector('.powa').setAttribute('data-aspect-ratio', overrideAspectRatio.toString());
    }

    // innerhtml ensures body tag not rendered
    return embedHTMLWithPlayStatus.innerHTML;
  }

  // if falsy (empty string, undefined, or null), return empty string
  // possibly throw an error
  return '';
}

export default formatEmbedMarkup;
