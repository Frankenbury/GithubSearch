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
