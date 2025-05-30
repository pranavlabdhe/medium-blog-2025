import axios from 'axios';
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } from './postSlice';

export const fetchPostsByUserId = (userId) => async (dispatch) => {
  dispatch(fetchPostsStart());
  try {
    const response = await axios.get(`https://medium-blog-2025.onrender.com/api/post/posts/${userId}`);
    dispatch(fetchPostsSuccess(response.data));
  } catch (error) {
    dispatch(fetchPostsFailure(error.message));
  }
};

// export const fetchPostsByAdmin = () => async (dispatch) => {
//     dispatch(fetchPostsStart());
//     try {
//       const response = await axios.get(`https://medium-blog-2025.onrender.com/api/post/adminposts`);
//       dispatch(fetchPostsSuccess(response.data));
//     } catch (error) {
//       dispatch(fetchPostsFailure(error.message));
//     }
//   };

