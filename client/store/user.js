import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user, levelledUp = false) => ({ type: GET_USER, user, levelledUp })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => {
      dispatch(getUser((res.data || defaultUser), false));
    })
    .catch(err => console.log(err));

export const auth = (
  email,
  password,
  method, //Can make shorter
  // userId
) => dispatch =>
    axios
      .post(`/auth/${method}`, { email, password })
      .then(
      res => {
        dispatch(getUser(res.data, false));
        console.log('RESULTS FROM FREAKING THUNK ME', res.data)
        // history.push('/home');
        history.push('/personality/profile/1');
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      }
      )
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
      history.push('/login');
    })
    .catch(err => console.log(err));

export const updateUser = (categoryId, incrXP = 0, HP = 0) => {
  return dispatch => {
    axios
      .put('/api/xp', { categoryId, incrXP })
      .then(res => {
        dispatch(getUser(res.data.user, res.data.levelledUp))
      })
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {

  switch (action.type) {
    case GET_USER:
      return {
        ...action.user,
        levelledUp: action.levelledUp
      };
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
