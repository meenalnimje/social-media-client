import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slice/appConfigSlice";
import postReducer from "./slice/postSlice";
import feedDataReducer from "./slice/feedSlice";
export default configureStore({
  reducer: {
    appConfigReducer,
    feedDataReducer,
    postReducer,
  },
});
