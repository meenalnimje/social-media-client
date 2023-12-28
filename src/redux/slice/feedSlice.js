import { BookmarkPost, getBookmarkPost, likeUnlike } from "./postSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosClient } from "../../utiles/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getFeedData = createAsyncThunk(
  "user/getPostOfFollowing",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getFeedData");
      console.log("result of feedData ", response.result);
      return response.result;
    } catch (e) {
      console.log(
        "this error is from getPostOfFollowing appConfigSlice side ",
        e
      );
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const followUnfollow = createAsyncThunk(
  "user/followUnfollow",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/followUnfollow", body);
      return response.result.user;
    } catch (e) {
      console.log("this error is from followUnfollow appConfigSlice side ", e);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        // action.payload=result
        state.feedData = action.payload;
      })
      .addCase(likeUnlike.fulfilled, (state, action) => {
        // to show like count just after clicking.so,now we have to update feedData
        const post = action.payload;
        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followUnfollow.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings?.findIndex(
          (item) => item._id === user._id
        );
        if (index !== -1) {
          state?.feedData?.followings?.splice(index, 1);
        } else {
          state?.feedData?.followings?.push(user);
        }
      });
  },
});
export default feedSlice.reducer;
