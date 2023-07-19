// The files which are not components(eg:-axiosClient) will not take direct dispatch call so we have to import the store in it
import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "../utiles/localStorageManager";
// import store from "../redux/store";
// import { setLoading, showToast } from "../redux/slice/appConfigSlice";
// import { TOAST_FAILURE } from "../App";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  // store.dispatch(setLoading(true));
  return request;
});
axiosClient.interceptors.response.use(
  async (response) => {
    const data = response.data;
    if (data.status === "ok") {
      return data;
    }
    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;
    // store.dispatch(
    //   showToast({
    //     type: TOAST_FAILURE,
    //     message: error,
    //   })
    // );
    // console.log("this is the erorr", error);
    // these error is from our server which we are sending as res.send(error)
    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axios
        .create({ withCredentials: true })
        .get(`${process.env.REACT_APP_BASE_URL}/auth/refresh`);
      if (response.status === "ok") {
        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.result.accessToken}`;
        return axios(originalRequest);
      } else {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
  async (error) => {
    // baki ke jo error's hai na woh isme intercept honge jo hamare server me nhi hai
    // store.dispatch(setLoading(false));
    // store.dispatch(
    //   showToast({
    //     type: TOAST_FAILURE,
    //     message: error.message,
    //   })
    // );
    return Promise.reject(error);
  }
);
