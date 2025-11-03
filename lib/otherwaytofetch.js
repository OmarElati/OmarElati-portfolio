const fetch = (await import('node-fetch')).default;

// Use environment variable for token (never hardcode!)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const fetchRepos = async () => {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not set in environment variables!');
  }

  const response = await fetch(
    'https://api.github.com/users/OmarElati/repos?per_page=100&sort=created&direction=desc',
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'OmarElati-Portfolio', // Required by GitHub
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Filter out unwanted repos
  const filteredProjects = data.filter(
    (repo) =>
      !['.github', 'Badges', 'OmarElati', 'easy-application'].includes(repo.name)
  );

  // Helper: Fetch image (preview or opengraph)
  const fetchImage = async (repoName) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    try {
      const contentResponse = await fetch(
        `https://api.github.com/repos/OmarElati/${repoName}/contents`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            'User-Agent': 'OmarElati-Portfolio',
          },
        }
      );

      if (!contentResponse.ok) {
        return `https://opengraph.githubassets.com/1/OmarElati/${repoName}`;
      }

      const contents = await contentResponse.json();
      const imageFile = contents.find((file) =>
        imageExtensions.some((ext) => file.name.toLowerCase().endsWith(`.${ext}`))
      );

      return imageFile
        ? imageFile.download_url
        : `https://opengraph.githubassets.com/1/OmarElati/${repoName}`;
    } catch (error) {
      console.error(`Error fetching image for ${repoName}:`, error.message);
      return `https://opengraph.githubassets.com/1/OmarElati/${repoName}`;
    }
  };

  // Helper: Fetch and clean README
  const fetchReadme = async (repoName) => {
    try {
      const readmeResponse = await fetch(
        `https://api.github.com/repos/OmarElati/${repoName}/readme`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            'User-Agent': 'OmarElati-Portfolio',
          },
        }
      );

      if (!readmeResponse.ok) return 'No description available';

      const readmeData = await readmeResponse.json();
      const decodedContent = atob(readmeData.content);

      const cleaned = decodedContent
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/#+\s/g, '')           // Remove headers
        .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
        .replace(/\*\*|\*|`/g, '')      // Remove bold, italic, code
        .replace(/:\w+:/g, '')          // Remove emojis
        .trim();

      return cleaned.split('\n').slice(0, 5).join(' ').substring(0, 200) + '...';
    } catch (error) {
      console.error(`Error fetching README for ${repoName}:`, error.message);
      return 'No description available';
    }
  };

  // Helper: Get all filenames recursively
  const getAllFiles = async (repoName, path = '') => {
    try {
      const res = await fetch(
        `https://api.github.com/repos/OmarElati/${repoName}/contents/${path}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            'User-Agent': 'OmarElati-Portfolio',
          },
        }
      );
      if (!res.ok) return [];
      const contents = await res.json();
      let files = [];

      for (const item of contents) {
        if (item.type === 'file') {
          files.push(item.name.toLowerCase());
        } else if (item.type === 'dir') {
          const nested = await getAllFiles(repoName, item.path);
          files.push(...nested);
        }
      }
      return files;
    } catch (error) {
      console.error(`Error scanning files in ${repoName}/${path}`);
      return [];
    }
  };

  // Helper: Detect tech stack
  const fetchStackInfo = async (repo) => {
    const files = await getAllFiles(repo.name);
    const stack = new Set();

    const checks = [
      ['package.json', 'Node.js'],
      ['tailwind.config.js', 'Tailwind CSS'],
      ['vite.config.js', 'Vite'],
      ['next.config.js', 'Next.js'],
      ['tsconfig.json', 'TypeScript'],
      ['Dockerfile', 'Docker'],
      ['requirements.txt', 'Python'],
      ['pyproject.toml', 'Poetry'],
      [/.jsx?$/, 'JavaScript'],
      [/.tsx?$/, 'React'],
      [/.vue$/, 'Vue.js'],
      [/.html$/, 'HTML'],
      [/.css$/, 'CSS'],
      [/.py$/, 'Python'],
      ['server.js', 'Express.js'],
      ['index.js', 'Express.js'],
      ['main.py', 'Flask'],
      ['app.py', 'Django'],
    ];

    files.forEach((file) => {
      checks.forEach(([pattern, tech]) => {
        if (typeof pattern === 'string' && file.includes(pattern)) {
          stack.add(tech);
        } else if (pattern instanceof RegExp && pattern.test(file)) {
          stack.add(tech);
        }
      });
    });

    return stack.size > 0 ? Array.from(stack).map(name => ({ name })) : [{ name: 'Unknown' }];
  };

  // Helper: Classify project type
  const classifyRepo = async (repo) => {
    try {
      const res = await fetch(
        `https://api.github.com/repos/OmarElati/${repo.name}/contents`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            'User-Agent': 'OmarElati-Portfolio',
          },
        }
      );
      if (!res.ok) return 'unknown';
      const contents = await res.json();
      const files = contents.map(f => f.name.toLowerCase());
      const name = repo.name.toLowerCase();
      const desc = (repo.description || '').toLowerCase();

      const rules = {
        frontend: { files: ['index.html', 'style.css'], folders: ['src', 'public'], keywords: ['react', 'vue', 'ui'] },
        backend: { files: ['server.js', 'app.py'], folders: ['api', 'routes'], keywords: ['node', 'django', 'api'] },
        fullstack: { keywords: ['fullstack', 'mern', 'nextjs'] },
        mobile: { files: ['app.js', 'pubspec.yaml'], keywords: ['flutter', 'react-native'] },
        dataScience: { files: ['notebook.ipynb'], keywords: ['ml', 'ai', 'data'] },
        devops: { files: ['dockerfile', 'jenkinsfile'], keywords: ['ci-cd', 'docker'] },
      };

      for (const [cat, { files: f, folders, keywords }] of Object.entries(rules)) {
        const match =
          f.some(x => files.includes(x)) ||
          (folders && contents.some(x => x.type === 'dir' && folders.includes(x.name))) ||
          keywords.some(k => name.includes(k) || desc.includes(k));

        if (match) return cat;
      }

      return 'unknown';
    } catch (error) {
      return 'unknown';
    }
  };

  // Format all projects
  const formattedProjects = await Promise.all(
    filteredProjects.map(async (repo, index) => {
      const [imageUrl, description, category, stack] = await Promise.all([
        fetchImage(repo.name),
        fetchReadme(repo.name),
        classifyRepo(repo),
        fetchStackInfo(repo),
      ]);

      return {
        num: String(index + 1).padStart(2, '0'),
        category,
        title: repo.name.replace(/[-_]/g, ' '),
        description,
        stack,
        image: imageUrl,
        live: repo.homepage || `https://omarelati.github.io/${repo.name}/`,
        github: repo.html_url,
      };
    })
  );

  return formattedProjects;
};
