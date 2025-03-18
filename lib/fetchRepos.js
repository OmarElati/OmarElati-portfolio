// export const fetchRepos = async () => {
//   const response = await fetch('https://api.github.com/users/OmarElati/repos?per_page=100&sort=created&direction=desc', {
//     headers: {
//       Authorization: `token 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`,
//     },
//   });
//   const data = await response.json();

//   // Filter out unnecessary repositories
//   const filteredProjects = data.filter(
//     (repo) => repo.name !== ".github" && repo.name !== "Badges" && repo.name !== "OmarElati" && repo.name !== "easy-application"
//   );

//   // Helper function to fetch images from a repo
//   const fetchImage = async (repoName) => {
//     const imageExtensions = ['jpg', 'png'];

//     try {
//       const contentResponse = await fetch(`https://api.github.com/repos/OmarElati/${repoName}/contents`, {
//         headers: {
//           Authorization: `token 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`,
//         },
//       });

//       if (!contentResponse.ok) {
//         return `https://opengraph.githubassets.com/1/OmarElati/${repoName}`;
//       }

//       const contents = await contentResponse.json();
//       const imageFile = contents.find(file => 
//         imageExtensions.some(ext => file.name.toLowerCase().endsWith(`.${ext}`))
//       );

//       return imageFile ? imageFile.download_url : `https://opengraph.githubassets.com/1/OmarElati/${repoName}`;
//     } catch (error) {
//       console.error(`Error fetching image for ${repoName}:`, error);
//       return `https://opengraph.githubassets.com/1/OmarElati/${repoName}`;
//     }
//   };

//   // Helper function to fetch README.md content
//   const fetchReadme = async (repoName) => {
//     try {
//       const readmeResponse = await fetch(`https://api.github.com/repos/OmarElati/${repoName}/readme`, {
//         headers: {
//           Authorization: `token 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`,
//         },
//       });

//       if (!readmeResponse.ok) {
//         return "No description available";
//       }

//       const readmeData = await readmeResponse.json();
//       const decodedContent = atob(readmeData.content);

//       const cleanedContent = decodedContent
//         .replace(/!\[.*?\]\(.*?\)/g, "")
//         .replace(/#+\s/g, "")
//         .replace(/\[.*?\]\(.*?\)/g, "")
//         .replace(/\*\*|\*/g, "")
//         .replace(/:\w+:/g, "")
//         .replace(/`+/g, "")
//         .trim();

//       return cleanedContent.split("\n").slice(0, 5).join(" ").substring(0, 200) + "...";
//     } catch (error) {
//       console.error(`Error fetching README for ${repoName}:`, error);
//       return "No description available";
//     }
//   };

//   const getAllFiles = async (repoName, path = "") => {
//     const response = await fetch(
//       `https://api.github.com/repos/OmarElati/${repoName}/contents/${path}`,
//       {
//         headers: { Authorization: `token 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` },
//       }
//     );
//     if (!response.ok) return [];
//     const contents = await response.json();
//     let files = [];
//     for (const file of contents) {
//       if (file.type === "file") {
//         files.push(file.name.toLowerCase());
//       } else if (file.type === "dir") {
//         const nestedFiles = await getAllFiles(repoName, file.path);
//         files = [...files, ...nestedFiles];
//       }
//     }
//     console.log(files);
//     return files;
//   };

// const fetchStackInfo = async (repo) => {
//   const filenames = await getAllFiles(repo.name);

//   let stack = [];

//   // Infer stack from filenames
//   if (filenames.includes('package.json')) stack.push({ name: 'Node.js' });
//   if (filenames.includes('tailwind.config.js')) stack.push({ name: 'Tailwind CSS' });
//   if (filenames.includes('vite.config.js')) stack.push({ name: 'Vite' });
//   if (filenames.includes('next.config.js')) stack.push({ name: 'Next.js' });
//   if (filenames.includes('tsconfig.json')) stack.push({ name: 'TypeScript' });
//   if (filenames.includes('Dockerfile')) stack.push({ name: 'Docker' });
//   if (filenames.includes('requirements.txt')) stack.push({ name: 'Python' });
//   if (filenames.includes('pyproject.toml')) stack.push({ name: 'Poetry' });

//   // Check for JavaScript files
//   if (filenames.some((file) => file.endsWith('.js'))) stack.push({ name: 'JavaScript' });

//   // Infer frontend libraries based on file extensions
//   if (filenames.some((file) => file.endsWith('.jsx') || file.endsWith('.tsx'))) stack.push({ name: 'React' });
//   if (filenames.some((file) => file.endsWith('.vue'))) stack.push({ name: 'Vue.js' });
//   if (filenames.some((file) => file.endsWith('.html'))) stack.push({ name: 'HTML' });
//   if (filenames.some((file) => file.endsWith('.css'))) stack.push({ name: 'CSS' });

//   // Check for Python files
//   if (filenames.some((file) => file.endsWith('.py'))) stack.push({ name: 'Python' });

//   // Infer backend technologies
//   if (filenames.includes('server.js') || filenames.includes('index.js')) stack.push({ name: 'Express.js' });
//   if (filenames.includes('main.py')) stack.push({ name: 'Flask' });
//   if (filenames.includes('app.py')) stack.push({ name: 'Django' });

//   return stack.length ? stack : [{ name: 'No stack info' }];
// };

// const classifyRepo = async (repo) => {
//   try {
//     const contentsResponse = await fetch(
//       `https://api.github.com/repos/OmarElati/${repo.name}/contents`,
//       {
//         headers: {
//           Authorization: `token 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`,
//         },
//       }
//     );

//     if (!contentsResponse.ok) return "unknown";

//     const contents = await contentsResponse.json();
//     const filenames = contents.map((file) => file.name.toLowerCase());

//     // Define common indicators for each specialty
//     const specialties = {
//       frontend: {
//         files: ["1-index.html", "index.html", "style.css", "app.css", "script.js", "package.json", "tailwind.config.js"],
//         folders: ["client", "src", "public", "components", "pages"],
//         keywords: ["react", "angular", "vue", "frontend", "ui", "css", "tailwind", "bootstrap"],
//       },
//       backend: {
//         files: ["server.js", "index.js", "app.js", "main.js", "main.py", "requirements.txt", "Dockerfile"],
//         folders: ["server", "api", "backend", "controllers", "models", "routes"],
//         keywords: ["node", "express", "django", "flask", "backend", "api", "server", "database"],
//       },
//       mobile: {
//         files: ["androidmanifest.xml", "info.plist", "gradle.build", "pubspec.yaml"],
//         folders: ["android", "ios", "lib", "flutter"],
//         keywords: ["react-native", "flutter", "android", "ios", "mobile", "swift"],
//       },
//       dataScience: {
//         files: ["notebook.ipynb", "data.csv", "train.py", "model.pkl"],
//         folders: ["notebooks", "datasets", "models"],
//         keywords: ["tensorflow", "pytorch", "ai", "machine-learning", "ml", "data-science"],
//       },
//       devops: {
//         files: ["dockerfile", "kubernetes.yaml", "terraform.tf", "jenkinsfile"],
//         folders: ["infra", "deployment", "k8s"],
//         keywords: ["docker", "kubernetes", "ci-cd", "devops", "ansible", "terraform"],
//       },
//       security: {
//         files: ["hashes.txt", "exploit.py", "payload.bin"],
//         folders: ["exploits", "crypto"],
//         keywords: ["pentesting", "ethical-hacking", "security", "cybersecurity", "encryption"],
//       },
//       gameDev: {
//         files: ["game.unity", "assets.meta", "game.godot"],
//         folders: ["assets", "scenes"],
//         keywords: ["unity", "unreal", "phaser", "gamedev", "game-development"],
//       },
//       embedded: {
//         files: ["main.ino", "firmware.hex", "circuit.sch"],
//         folders: ["hardware", "firmware"],
//         keywords: ["iot", "arduino", "raspberry-pi", "embedded", "microcontroller"],
//       },
//       dsa: {  // Data Structures & Algorithms
//         files: ["binary_trees.c", "linked_list.c", "sorting_algorithms.c", "graph.c"],
//         folders: ["data_structures", "algorithms"],
//         keywords: ["binary_trees", "algorithms", "sorting", "graphs", "heap", "linked lists"],
//       },
//     };

//     // Extract repo name & description
//     const repoName = repo.name.toLowerCase();
//     const repoDescription = repo.description ? repo.description.toLowerCase() : "";

//     // Determine the category
//     for (const [category, { files, folders, keywords }] of Object.entries(specialties)) {
//       const hasMatch =
//         filenames.some((file) => files.includes(file)) ||
//         filenames.some((folder) => folders.includes(folder)) ||
//         keywords.some((keyword) => repoName.includes(keyword) || repoDescription.includes(keyword));

//       if (hasMatch) return category;
//     }

//     // Fullstack check (if both frontend & backend detected)
//     const hasFrontend =
//       specialties.frontend.files.some((file) => filenames.includes(file)) ||
//       specialties.frontend.folders.some((folder) => filenames.includes(folder));

//     const hasBackend =
//       specialties.backend.files.some((file) => filenames.includes(file)) ||
//       specialties.backend.folders.some((folder) => filenames.includes(folder));

//     if (repo.topics.includes("fullstack") || (hasFrontend && hasBackend)) {
//       return "fullstack";
//     }

//     return "unknown"; // If no category matched
//   } catch (error) {
//     console.error(`Error classifying ${repo.name}:`, error);
//     return "unknown";
//   }
// };


// const formattedProjects = await Promise.all(filteredProjects.map(async (repo, index) => {
//   const imageUrl = await fetchImage(repo.name);
//   const description = await fetchReadme(repo.name);
//   const category = await classifyRepo(repo);
//   const stack = await fetchStackInfo(repo);

//   return {
//     num: String(index + 1).padStart(2, '0'),
//     category,
//     title: repo.name.replace(/[-_]/g, " "),
//     // description: repo.description || "No description available",
//     description,
//     stack,
//     image: imageUrl,
//     live: repo.homepage
//       ? repo.homepage
//       : `https://omarelati.github.io/${repo.name}/`,
//     github: repo.html_url,
//   };
// }));

// console.log(formattedProjects);
// return formattedProjects;
// };

export const fetchRepos = async () => {
  const response = await fetch('https://github-cache-backend-production.up.railway.app/');
  const data = await response.json();
  return data;
};
