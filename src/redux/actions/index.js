export const UPDATE_LOGIN = 'UPDATE_LOGIN';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';

export const updateLogin = (login) => ({
  type: UPDATE_LOGIN,
  login,
});

export const updateToken = () => (
  async (dispatch) => {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: UPDATE_TOKEN,
      token: data.token,
    });
  }
);