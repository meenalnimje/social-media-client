import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosClient } from "../../utiles/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/userInfo", body);
      // console.log("user info slice ", response.result);
      return response.result;
    } catch (e) {
      console.log("this error is from getuserInfo appConfigSlice side ", e);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const likeUnlike = createAsyncThunk(
  "post/likeUnlike",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/post/like", body);
      // console.log("response of like ", response.result.post);
      return response.result.post;
    } catch (e) {
      console.log("this error is from likeandUnlike postSlice side ", e);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        // action.payload=result
        state.userProfile = action.payload;
      })
      .addCase(likeUnlike.fulfilled, (state, action) => {
        // to show like count just after clicking
        const post = action.payload;
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});
export default postSlice.reducer;
// export const { setLoading } = appConfigSlice.actions; no reducer means no normal actions
