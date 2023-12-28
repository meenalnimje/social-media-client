import "./Profile.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import CreatePost from "../createPost/CreatePost";
import Post from "../../components/post/Post";
import { followUnfollow } from "../../redux/slice/feedSlice";
import { getUserInfo } from "../../redux/slice/postSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const userProfile = useSelector((state) => state.postReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const followers = userProfile?.followers;
  const followings = userProfile?.followings;
  const posts = userProfile?.posts;
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    dispatch(
      getUserInfo({
        userId: params.userId,
      })
    );
    setIsMyProfile(params.userId === myProfile?._id);
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [params.userId, myProfile, feedData]);
  function handleFollowUnfollow() {
    dispatch(
      followUnfollow({
        userId: params.userId,
      })
    );
  }
  return (
    <div className="profile">
      <div className="content">
        <div className="left">
          {isMyProfile && <CreatePost />}
          {posts?.map((item) => (
            <Post post={item} />
          ))}
        </div>
        <div className="right">
          <div className="profile-card">
            <img
              className="user-img"
              src={userProfile?.avatar?.url}
              alt="profile"
            />
            <h3 className="name">{userProfile?.name}</h3>
            <p className="bio">{userProfile?.bio}</p>
            <div className="follower-info">
              <h4>{followers?.length} followers</h4>
              <h4>{followings?.length} followings</h4>
            </div>
            {!isMyProfile && (
              <h5
                className={
                  isFollowing
                    ? "hover-link follow-link btn-secondary"
                    : "btn-primary"
                }
                onClick={handleFollowUnfollow}
              >
                {isFollowing ? "UnFollow" : "Follow"}
              </h5>
            )}
            {isMyProfile && (
              <button
                className="update btn-secondary"
                onClick={() => {
                  navigate("/updateProfile");
                }}
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
