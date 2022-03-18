import { createContext, useReducer } from 'react';
import { createRenderer } from 'react-dom/test-utils';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GH_URL = process.env.REACT_APP_GH_URL;
const GH_TOKEN = process.env.REACT_APP_GH_TOKEN;

export const GithubProvider = ({ children }) => {
  // Use initialstate because of reducer instead of useState
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  };

  // dispatch is used to dispatch an action to the reducer
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get query results
  const searchUsers = async (text) => {
    setIsLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GH_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GH_TOKEN}`,
      },
    });
    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // Get single user
  const getUser = async (login) => {
    setIsLoading();

    const response = await fetch(`${GH_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GH_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  const getRepos = async (login) => {
    setIsLoading();

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

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  };

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  const setIsLoading = () => dispatch({ type: 'SET_ISLOADING' });

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        isLoading: state.isLoading,
        repos: state.repos,
        searchUsers,
        getUser,
        clearUsers,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
