'use strict';

import axios from 'axios';
// import history from '../history'

// ACTION TYPES
// const WRITE_CATEGORY_NAME = 'WRITE_CATEGORY_NAME';
const GET_HABITS = 'GET_HABITS';
const ADD_HABIT = 'ADD_HABIT';
const DELETE_HABIT = 'DELETE_HABIT'

// ACTION CREATORS
// export function writeCategoryName (categoryName) {
//   const action = { type: WRITE_CATEGORY_NAME, categoryName };
//   return action;
// }

const getHabits = habits => ({ type: GET_HABITS, habits });


const deleteHabit = habit => {
  return { type: DELETE_HABIT, habit }
}

export function addHabit(habit) {
  return { type: ADD_HABIT, habit }
}

export const postHabit = (userId, categoryId, habit) => {
  return dispatch => {
    return axios.post(`/api/habits/${userId}/${categoryId}`, habit)
      .then(res => {
        console.log("INSIDE POST THUNK", res.data)
        return res.data
      })
      .then(() => {
        dispatch(addHabit(habit))
      })
      .catch(err => console.log(err))
  }
}



// THUNK CREATORS
export const fetchHabits = (userId, categoryId) => {
  return dispatch => {
    axios
      .get(`/api/habits/${userId}/${categoryId}`)
      .then(res => res.data)
      .then(habits => {
        dispatch(getHabits(habits)); //Something goes wrong after this point
      })
      .catch(console.error);
  };
};


// const deleteHabit = (userId, habit)=>{
//   return dispatch => {
//     return axios.delete(`/${userId}/${categoryId}`, { habit })
//       .then(res => {
//         console.log("INSIDE Delete THUNK", res)
//         dispatch(deleteHabit(res.data))
//       })
//       .catch(err => console.log(err))
//   }
// }

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    // case WRITE_CATEGORY_NAME:
    //   return action.categoryName;
    case GET_HABITS:
      return action.habits;
    case ADD_HABIT:
      return [action.habit, ...state]
    default:
      return state;
  }
}
