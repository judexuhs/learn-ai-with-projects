import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function tsxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return tsxFiles(path);
      return entry.name.endsWith('.tsx') ? [path] : [];
    }),
  );
  return nested.flat();
}

test('production navigation does not depend on vinext client Link routing', async () => {
  const files = [...(await tsxFiles('app')), ...(await tsxFiles('components'))];
  const offenders = [];

  for (const file of files) {
    const source = await readFile(file, 'utf8');
    if (source.includes("from 'next/link'")) offenders.push(file);
  }

  assert.deepEqual(offenders, []);
});
