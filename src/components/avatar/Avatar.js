import React from "react";
import "./Avatar.scss";
import { useNavigate } from "react-router-dom";
import dummyProfile from "../../assets/dummyProfile.png";
import { useSelector } from "react-redux";
function Avatar({ src }) {
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  return (
    <div className="avatar">
      <div
        className="content hover-link"
        onClick={() => {
          navigate(`/profile/${myProfile?._id}`);
        }}
      >
        <img src={src ? src : dummyProfile} alt="profile" />
      </div>
    </div>
  );
}

export default Avatar;
