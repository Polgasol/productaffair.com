import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: null,
  guest: true,
  timezone: null,
  verified: false,
  type: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // state = initialState
    // action = newValue of the state
    // useDispatch onClick={ () => dispatch(login({ userName: 'Jayce' }))} = action in (state, action)
    // useSelector((state) => state.user.value.username)
    // state === all the reducer's name in redux store
    // state.user === one of the reducers inside the redux store
    // state.user automatically == to the updated initial state of the slice.
    updateAuth: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { updateAuth, logout } = authSlice.actions;
