import "./Post.scss";

import { BookmarkPost, likeUnlike } from "../../redux/slice/postSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineHeart } from "react-icons/ai";
import Avatar from "../avatar/Avatar";
import Comments from "../comments/Comments";
import { FcLike } from "react-icons/fc";
import { TOAST_SUCCESS } from "../../App";
import { axiosClient } from "../../utiles/axiosClient";
import { setLoading } from "../../redux/slice/appConfigSlice";
import { showToast } from "../../redux/slice/appConfigSlice";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commenttxt, setCommenttxt] = useState("");
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
  const fetchComments = async () => {
    try {
      const response = await axiosClient.get(`/comment/${post._id}`);
      console.log("result of comments", response);
      setComments(response.result.comment);
    } catch (e) {
      console.log("this error is from comments,", e);
    }
  };
  async function addComment() {
    try {
      dispatch(setLoading(true));
      // console.log("description", commenttxt);
      const response = await axiosClient.post("/comment/", {
        postId: post._id,
        desc: commenttxt,
      });
      console.log("comment is added", response);
    } catch (e) {
      console.log("this error is from addcomments,", e);
    } finally {
      dispatch(setLoading(false));
      setCommenttxt(" ");
      fetchComments();
    }
  }
  useEffect(() => {
    fetchComments();
  }, [post._id]);
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
          <div className="comment-box">
            <button id="myBtn" onClick={() => setOpen(true)}>
              view comments
            </button>
            <div id="myPopup" className={open ? "show popup" : "popup"}>
              <div className="popup-content">
                <div className="all-comments">
                  {comments.map((item) => (
                    <Comments info={item} />
                  ))}
                </div>
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Add a comment...."
                    onChange={(e) => setCommenttxt(e.target.value)}
                  />
                  <button onClick={addComment} className="btn-primary">
                    Add
                  </button>
                </div>
                <button id="closePopup" onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
          <h6 className="time-ago">{post?.timeAgo}</h6>
        </div>
      </div>
    </div>
  );
}

export default Post;
