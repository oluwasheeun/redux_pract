import _ from 'lodash';

import jsonPlaceholder from '../api/jsonPlaceholder';

// export const fetchPosts = () => {
//   return async (dispatch, getState) => {
//     const response = await jsonPlaceholder.get('/posts');
//     dispatch({
//       type: 'FETCH_POSTS',
//       payload: response,
//     });
//   };
// };

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = _.uniq(_.map(getState().posts, 'userId'));

  userIds.map(id => dispatch(fetchUser(id)));
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');
  dispatch({
    type: 'FETCH_POSTS',
    payload: response.data,
  });
};

export const fetchUser = userId => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);
  dispatch({
    type: 'FETCH_USER',
    payload: response.data,
  });
};

// export const fetchUser = userId => dispatch => _fetcUser(userId, dispatch);

// const _fetcUser = _.memoize(async (userId, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${userId}`);
//   dispatch({
//     type: 'FETCH_USER',
//     payload: response.data,
//   });
// });
