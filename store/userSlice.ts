import {createSlice, current} from '@reduxjs/toolkit';
export interface comment {
  id: string;
  author: string;
  text: string;
  replies: comment[];
}
export interface ListComment {
  user: string;
  posts: comment[];
}
export const users = ['user1', 'user2'];

const data = {
  user1: {
    posts: {
      '1': {
        id: '1',
        author: 'user1',
        text: 'first Comment from user1',
        replies: [],
      },
    },
  },
  user2: {
    posts: {
      '2': {
        id: '2',
        author: 'user2',
        text: 'first Comment from user 2',
        replies: [],
      },
    },
  },
};

const initialState = {
  userList: users,
  currentUser: users[0],
  data: data,
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    changeCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    addPost(state, action) {
      const Comment: comment = {
        id: Number.parseInt(Math.random() * 9999).toString(),
        author: state.currentUser,
        text: action.payload,
        replies: [],
      };
      state.data[state.currentUser].posts[Comment.id] = Comment;
    },
    addReply(state, action) {
      //user // post id //
      const Post_User = action.payload.user;
      const postId = action.payload.id;
      const Reply: comment = {
        id: Number.parseInt(Math.random() * 9999).toString(),
        author: state.currentUser,
        text: action.payload.text,
        replies: [],
      };
      state.data[Post_User].posts[postId].replies = [
        ...state.data[Post_User].posts[postId].replies,
        Reply,
      ];
    },
  },
});

export const {changeCurrentUser, addPost, addReply} = userSlice.actions;

export default userSlice.reducer;
