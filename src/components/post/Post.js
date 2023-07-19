import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkPost, likeUnlike } from "../../redux/slice/postSlice";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../redux/slice/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import { BsBookmark } from "react-icons/bs";
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
  function handleBookmarkPost() {
    dispatch(
      BookmarkPost({
        postId: post._id,
      })
    );
  }
  return (
    <div className="post">
      <div
        className="heading"
        onClick={() => {
          navigate(`/profile/${post?.owner?._id}`);
        }}
      >
        <Avatar className="avatar" src={post?.owner?.avatar?.url} />
        <h4 className="name">{post?.owner?.name}</h4>
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
          <div className="bookmark-icon">
            <BsBookmark onClick={handleBookmarkPost} />
          </div>
        </div>
        <div className="profile-info">
          <p className="caption">{post?.caption}</p>
          <h6 className="time-ago">{post?.timeAgo} ago</h6>
        </div>
      </div>
    </div>
  );
}

export default Post;
