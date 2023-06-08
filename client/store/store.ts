import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../redux-slice/auth';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// define types for typescript ng root state and dispatch(useSelector, useDispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
