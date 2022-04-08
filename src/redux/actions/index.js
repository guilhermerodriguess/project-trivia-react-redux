export const UPDATE_LOGIN = 'UPDATE_LOGIN';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';
export const RESET_SCORE = 'RESET_SCORE';
export const UPDATE_TIME = 'UPDATE_TIME';

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

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const updateAssertions = (assertions) => ({
  type: UPDATE_ASSERTIONS,
  assertions,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export const updateTimer = (time) => ({
  type: UPDATE_TIME,
  time,
});
