const GH_URL = process.env.REACT_APP_GH_URL;
const GH_TOKEN = process.env.REACT_APP_GH_TOKEN;

// Get query results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await fetch(`${GH_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GH_TOKEN}`,
    },
  });
  const { items } = await response.json();

  return items;
};

// Get single user
export const getUser = async (login) => {
  const response = await fetch(`${GH_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GH_TOKEN}`,
    },
  });

  if (response.status === 404) {
    window.location = '/notfound';
  } else {
    const data = await response.json();
    return data;
  }
};

// Get the user's repos
export const getRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const response = await fetch(`${GH_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GH_TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
};
