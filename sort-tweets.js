/**
 * Sort tweets by tweet ID.
 *
 * @author Alex TSANG <alextsang@live.com>
 * @license BSD-3-Clause
 */

/**
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
 */

const ID_REGEX = /status\/(\d+)/;

const urls = [
  'https://twitter.com/bing/status/1432025272648413185?s=20',
  'https://twitter.com/BBCEarth/status/1431979983036108805?s=20',
  'https://twitter.com/openbsd/status/1431899111381520386?s=20',
  'https://twitter.com/ThePracticalDev/status/1431202419149508609?s=20'
];

/**
 * Extracts tweet ID from the given tweet URL.
 *
 * @param {string} url Tweet URL.
 *
 * @returns {string} Tweet ID.
 */
const extractId = (url) => {
  const results = url.match(ID_REGEX);
  if (!Array.isArray(results)) {
    throw new Error(`No ID pattern: ${url}`);
  }
  if (results.length !== 2) {
    throw new Error(`No ID found: ${url}`);
  }
  return results[1];
};

const buildTweetItem = (url) => ({
  id: extractId(url),
  url
});

const compareURL = (urlA, urlB) => (urlA.id - urlB.id);

const main = () => {
  urls.map((url) => buildTweetItem(url))
    .sort(compareURL)
    .forEach((item) => console.log(item.url));
};

main();
