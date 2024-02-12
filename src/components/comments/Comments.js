import "./Comments.scss";

import { useDispatch, useSelector } from "react-redux";

import Avatar from "../avatar/Avatar";
import React from "react";
import { axiosClient } from "../../utiles/axiosClient";
import { setLoading } from "../../redux/slice/appConfigSlice";

function Comments(props) {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  async function handleDeleteComment() {
    try {
      dispatch(setLoading(true));
      const response = await axiosClient.delete(`/comment/${props?.info?._id}`);
    } catch (e) {
      console.log("error from delete commnet side", e);
    } finally {
      dispatch(setLoading(false));
      window.location.reload(true);
    }
  }
  return (
    <div className="comments">
      <div className="profile-icon">
        <Avatar src={props?.info?.owner.avatar?.url} />
      </div>
      <div className="comment">
        <p>{props.info.owner.name}</p>
        <p>{props.info.desc}</p>
      </div>
      {/* meri id comment ke owner ki id se barabar hai toh delte karo ya phir meri id post ke owner ki id ke barabar hai toh usko delet karo */}
      {myProfile._id == props.info.owner._id && (
        <div className="btn-delete" onClick={handleDeleteComment}>
          delete
        </div>
      )}
    </div>
  );
}

export default Comments;
