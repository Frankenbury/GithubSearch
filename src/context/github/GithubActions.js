import axios from 'axios';

const GH_URL = process.env.REACT_APP_GH_URL;
const GH_TOKEN = process.env.REACT_APP_GH_TOKEN;

const github = axios.create({
  baseURL: GH_URL,
  headers: { Authorization: `token ${GH_TOKEN}` },
});

// Get query results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// Get user and their repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`, { params: { per_page: 10 } }),
  ]);

  return { user: user.data, repos: repos.data };
};
