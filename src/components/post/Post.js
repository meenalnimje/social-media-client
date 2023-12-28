import "./Post.scss";

import {
  BookmarkPost,
  likeUnlike,
} from "../../redux/slice/postSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineHeart } from "react-icons/ai";
import Avatar from "../avatar/Avatar";
import { BsBookmark } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slice/appConfigSlice";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post?.isLiked);
  function handlePostLike() {
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: "liked or unliked",
      })
    );
    dispatch(
      likeUnlike({
        postId: post._id,
      })
    );
  }
  function handleLikebtn() {
    setIsLiked(!isLiked);
  }
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  return (
    <div className="post">
      <div className="heading">
        <div
          className="profile-icon"
          onClick={() => {
            navigate(`/profile/${post?.owner?._id}`);
          }}
        >
          <Avatar className="avatar" src={post?.owner?.avatar?.url} />
        </div>
        <h4
          className="name"
          onClick={() => {
            navigate(`/profile/${post?.owner?._id}`);
          }}
        >
          {post?.owner?.name}
        </h4>
      </div>
      <div className="mid">
        <img src={post?.image?.url} alt="image not found" />
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLike}>
          {isLiked ? (
            <FcLike className="icon" onClick={handleLikebtn} />
          ) : (
            <AiOutlineHeart className="icon" onClick={handleLikebtn} />
          )}
          <h4 className="like-count">{post?.likes} likes</h4>
        </div>
        <div className="profile-info">
          <p className="caption">{post?.caption}</p>
          <h6 className="time-ago">{post?.timeAgo}</h6>
        </div>
      </div>
    </div>
  );
}

export default Post;
