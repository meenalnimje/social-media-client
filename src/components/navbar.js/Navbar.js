import React from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../utiles/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utiles/localStorageManager";
import { setLoading } from "../../redux/slice/appConfigSlice";
import SearchBar from "../searchbar/SearchBar";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  // console.log(myProfile);
  async function handleLogout() {
    try {
      dispatch(setLoading(true));
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
      dispatch(setLoading(false));
    } catch (e) {
      console.log("this error is from logout navbar side ", e);
    }
  }
  return (
    <div className="navbar">
      <div className="content">
        <div className="left">
          <h2
            className="heading hover-link"
            onClick={() => {
              navigate("/");
            }}
          >
            Social Media
          </h2>
        </div>
        <div className="middle">
          <SearchBar />
        </div>
        <div className="right">
          <Avatar src={myProfile?.avatar?.url} />
          <p className="name">{myProfile?.name}</p>
          <div className="logout center hover-link" onClick={handleLogout}>
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
