import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML IDs must be unique');
for (const match of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
  const value = match[1];
  if (value.startsWith('#')) assert(ids.includes(value.slice(1)), `Missing anchor: ${value}`);
  else if (value.startsWith('./')) await access(new URL(value, root));
}
assert.equal([...html.matchAll(/<h1\b/g)].length, 1, 'Page must have one primary heading');
assert(html.includes('does not send or save'), 'Form placeholder must disclose its behavior');
assert(!html.includes('wixapps.net'), 'Wix widgets must not be included');
console.log(`Verified local assets, anchor targets, unique IDs, page heading, and demo placeholder (${ids.length} IDs).`);
