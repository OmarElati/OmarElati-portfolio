export const fetchRepos = async () => {
  const response = await fetch('http://localhost:3001/');
  const data = await response.json();
  return data;
};
