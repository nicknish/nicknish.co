export const COMMENTS_URL = 'https://cdn.commento.io/js/commento.js';

// Sets the id of the element for Commento to initialize on
// Warning: Changing this breaks Commento!
export const SCRIPT_ELEMENT_TARGET = 'commento';

// Selector to target loaded Commento element
export const COMMENTS_SELECTOR = '.commento-root';

// TODO: Override Commento's styling to lower page weight
// In order for Commento to work correctly, the script has to be redownloaded on
// every page. To lower the page weight, we can stop Commento from downloading
// the CSS file and either host it ourselves or rewrite it.
export const SCRIPT_ATTRIBUTES = {
  'data-auto-init': false
};
