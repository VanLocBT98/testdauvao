import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./Reducers/projectReducer";

import userReducer from "./Reducers/userReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    projectReducer:projectReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {pots: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
