// test.js
import 'dotenv/config';
import { fetchRepos } from './lib/fetchRepos.js';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

(async () => {
  try {
    console.log('Fetching repos from GitHub...');
    const repos = await fetchRepos();

    const filePath = resolve(process.cwd(), 'projects.json');
    await writeFile(filePath, JSON.stringify(repos, null, 2), 'utf-8');

    console.log(`SUCCESS: ${repos.length} repos saved to projects.json`);
    console.log(`File: ${filePath}`);
  } catch (err) {
    console.error('FAILED:', err.message);
  }
})();
