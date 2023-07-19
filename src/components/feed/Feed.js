import React, { useEffect } from "react";
import "./Feed.scss";
import Post from "../post/Post";
import Followers from "../followers/Followers";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slice/feedSlice";
function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  useEffect(() => {
    dispatch(getFeedData());
    // we write dispatch in dependency array to prevent infinite rendering
  }, [dispatch]);
  return (
    <div className="feed">
      <div className="content">
        <div className="left">
          {feedData?.posts?.map((item) => (
            <Post post={item} key={item._id} />
          ))}
        </div>
        <div className="right">
          <div className="followings">
            <h3 className="title">You are Following</h3>
            {feedData?.followings?.map((item) => (
              <Followers props={item} />
            ))}
          </div>
          <div className="suggestions">
            <h3 className="title">Suggestions for You</h3>
            {feedData?.suggestions?.map((item) => (
              <Followers props={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
