import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utiles/axiosClient";
export const getMyInfo = createAsyncThunk(
  "user/myInfo",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/myInfo");
      // action.payload response.result banega as hmne usko return kiya hai
      return response.result;
    } catch (e) {
      console.log("this error is from getMyInfo appConfigSlice side ", e);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.put("/user/", body);
      // console.log(response.result);
      return response.result;
    } catch (e) {
      console.log("this error is from updateMyProfile appConfigSlice side ", e);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        // action.payload=result
        state.myProfile = action.payload?.user;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload?.user;
      });
  },
});
export default appConfigSlice.reducer;
export const { setLoading, showToast } = appConfigSlice.actions;
