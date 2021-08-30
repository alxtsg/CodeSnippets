/**
 * Generate a music playlist (PLS) from a directory of music files.
 *
 * @author Alex TSANG <alextsang@live.com>
 * @license BSD-3-Clause
 */

const fs = require('fs');

const SCAN_DIRECTORY = 'C:\\Users\\alext\\Music';
const IGNORED_FILES = [
  'desktop.ini',
  'Instrumental'
];
const SERVER = 'https://www.example.net';
const SERVER_MUSIC_DIRECTORY = 'music';
const OUTPUT_FILE = 'C:\\Users\\alext\\Downloads\\music.pls';

const fsPromises = fs.promises;

/**
 * Generates the playlist.
 *
 * @param {string[]} files Filenames.
 *
 * @returns {string} Music playlist in PLS format.
 */
const generatePLS = (files) => {
  const lines = [];
  lines.push('[playlist]');
  files.forEach((file, index) => {
    const url = new URL(`${SERVER_MUSIC_DIRECTORY}/${file}`, SERVER);
    lines.push(`File${(index + 1)}=${url.href}`);
    lines.push(`Title${(index + 1)}=${file}`);
  });
  lines.push(`NumberOfEntries=${files.length}`);
  lines.push('Version=2');
  return lines.join('\n');
};

const main = async () => {
  const files = await fsPromises.readdir(SCAN_DIRECTORY);
  const musicFiles = files.filter((file) => !IGNORED_FILES.includes(file));
  const content = generatePLS(musicFiles);
  await fsPromises.writeFile(OUTPUT_FILE, content);
};

main();
