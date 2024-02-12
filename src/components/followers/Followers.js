// isme hm uski image name ur follow unfollow ka option denge.

import "./Follower.scss";

import React, { useState } from "react";
import { followUnfollow, getFeedData } from "../../redux/slice/feedSlice";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../avatar/Avatar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Followers({ props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const [isFollowings, setIsFollowings] = useState(false);
  useEffect(() => {
    // feedData is my data only but has everything in it
    // agar mujhe ek bhi feedData jo dusre user ka data hai uske followings me meri userId milti hai means i follow him/her
    if (feedData.followings.find((item) => item._id === props._id)) {
      setIsFollowings(true);
    }
  }, [feedData]);
  function handleFollowUnfollow() {
    dispatch(
      followUnfollow({
        userId: props._id,
      })
    );
  }
  return (
    <div className="followers">
      <div className="profile-icon">
        <Avatar src={props?.avatar?.url} />
      </div>
      <div className="name">
        <h4
          onClick={() => {
            navigate(`/profile/${props._id}`);
          }}
        >
          {props?.name}
        </h4>
      </div>
      <div className="button">
        <h5
          className={isFollowings ? "btn-secondary" : "btn-primary"}
          onClick={handleFollowUnfollow}
        >
          {isFollowings ? "UnFollow" : "Follow"}
        </h5>
      </div>
    </div>
  );
}

export default Followers;
